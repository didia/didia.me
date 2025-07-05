---
template: post
title: Find the commit that introduced a bug faster than The Flash
slug: using-bisect-to-find-bad-commit
draft: false
date: 2019-04-29T11:00:33.353Z
description: >-
  If you use git and you found yourself in a situation where you needed to find
  a commit that introduced a bug in your code, then git bisect is your friend.
category: Software Engineering
tags:
  - Software Engineering
thumbnail: /media/find-buggy-commit-faster.jpg
---
_Dear friend,_

A couple of months ago, I gave a presentation at [work](https://life.mirego.com/en) about using binary search as a debugging algorithm. Today I want to share the same thing with you, specially on how to use binary search to find a commit that introduced a bug in your code.

![](/media/find-buggy-commit-faster.jpg)

If you are a developer like I am, you have probably found yourself in a situation where a feature that was working as intended has suddenly become broken. If you use a revision control system, you may have needed to find the commit that first introduced the bug in order to fix it quickly.

One way to do it is to start by the latest commit with the bug and walk backwards until you find a working commit. If the bug has been introduced several commits before, this can be tedious and can take a lot of time. In fact, the complexity of this task is linear and depends on the number of potential bad commits.

> Because your commits are stored in a sorted tree, you can use binary search to find a buggy commit way faster than the linear approach ⚡️

Another way is to use a binary search algorithm to find the buggy commit. I think this is the best way because it is much faster than the linear one. To do it you need to first identify two commits, one good commit and one bad commit. And then check the commit in the middle to check if it’s a good or bad one. If it’s good commit, then all commits before it are good and you need to check only the remaining commits after it. If it’s a bad commit then the remaining commits after it are also bad and you need to check only commits before it. And by doing that you have eliminated half of your initial commits that you don’t need to check. Pretty cool right 😎? Repeat this process until you find the first bad commit.

> Revision control system like git or mercurial have built-in commands to help you find a buggy commit without doing it manually yourself. 💚

Now I know what you are thinking: doing this manually is still tedious. And you are absolutely right. Going over your commits to find which one is the middle, then checking it out to see if the error is still there and so on and so on; it is indeed tedious. Luckily enough if you use _git_ or mercurial (_hg_), then there is a built-in command named [_git bisect_](https://git-scm.com/docs/git-bisect) or [_hg bisect_](https://www.mercurial-scm.org/repo/hg/help/bisect) that performs this binary search for you.

## This is how to use them

For this demo,  I will use _git_ but the _bisect_ command works pretty much the same way in both _git_ and _mercurial_. 

So for the context, I have this project with 1,107 commits in it. We just found out that an important feature does not work anymore in production (currently _v1.10.5_ ) but its code looks good. \
I realize we did not have automated tests for that feature (big fail). So before starting anything, I start by writing a test script for the feature. When I run it on the latest commit it does fail.

```bash
$ ./test_import_feature.sh
❌Assertion failed: Important feature is not working
```

You actually don’t need a test script per se, your bug could be a visual one, so your test would likely be just checking if it looks good.\
\
Now that we have a test for our important feature, let’s find the guilty commit together.\
First we kneed to tell git that we are going to start bisecting the code.

```bash
$ git bisect start
```

Now we need to give the algorithm both a known good commit and a known bad commit. For the bad commit, it’s easy just pick the latest commit. For the good commit, usually you can pick the latest working commit you know was working. In our case we know that our latest working version was _v1.0.0_(commit _3f29f2c_). 

```bash
$ git bisect bad HEAD
$ git bisect good 3f29f2c
Bisecting: 100 revisions left to test after this (roughly 7 steps)[dfeb81250bc4d622d61b21611918d93ffc2e5342] Fix lint
```

There was 201 commits since our latest working commit. Now after specifying the bad and good commit, _git_ tells us that we are left with 100 revisions to test and that we have roughly 7 more steps to do before finding our guilty commit. And it also checkout a commit for us to test if it’s good or bad. Let’s run our test again to find out.

```bash
$ ./test_import_feature.sh
❌Assertion failed: Important feature is not working
```

Oups 🙊still failing. Now we know this commit is bad. Let’s tell git.

```bash
$ git bisect bad
Bisecting: 49 revisions left to test after this (roughly 6 steps)[4f88051ecb530874facdf78335a33d279fd7937e] Fix build jobs
```

Now git send us to another commit. Let’s run the test again to see if it’s bad or good.

```bash
$ ./test_import_feature.sh
✅Test passed: Important feature is working 🎉
```

Oh yeah, now it’s working! We have ourself a good commit. So we will keep doing the same step over and over until we found the bad commit.

```bash
$ git bisect good
Bisecting: 24 revisions left to test after this (roughly 5 steps)[4a975c385d6ddf0cee2e368788f8744172c7a4f7] Add new checkout route (#820)

$ ./test_import_feature.sh
✅Test passed: Important feature is working 🎉

$ git bisect good
Bisecting: 12 revisions left to test after this (roughly 4 steps)[f30f561685fa348c574a078d69d592d4faf4bf84] Add new display bloc (#825)

$ ./test_import_feature.sh
❌Assertion failed: Important feature is not working

$ git bisect bad
Bisecting: 5 revisions left to test after this (roughly 3 steps)[1ffe58d9432f4d1b28e67115e3eb2d9eecd58aec] Modify default docker stack

$ ./test_import_feature.sh
✅Test passed: Important feature is working 🎉

$ git bisect good
Bisecting: 2 revisions left to test after this (roughly 2 steps)[ee863df9dede04e48c23f2d7ec7c2bdd39791f6b] Fix font color (#822)

$ ./test_import_feature.sh
❌Assertion failed: Important feature is not working

$ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 1 step)[cb1dee22424046470e07ae135f88fe0bcdb24c35] Modify beanstalk deployment policy

$ ./test_import_feature.sh
❌Assertion failed: Important feature is not working

$ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)[ac303ac4a1297ede0eae36698e8cb98ff160ccf6] Modify rolling updates (#821)

$ ./test_import_feature.sh
✅Test passed: Important feature is working 🎉

$ git bisect good
cb1dee22424046470e07ae135f88fe0bcdb24c35 is the first bad commit
commit cb1dee22424046470e07ae135f88fe0bcdb24c35
Author: Aristote Diasonama
Date: Wed Jun 27 08:59:19 2018 -0400
   Modify beanstalk deployment policy
```

Victory 🥂, after only 7 steps we have found our guilty commit amongst 201 potential commits. And as you can see, the error was made after modifying beanstalk deployment policy which we could not have guessed as it is not in our application code but in our infrastructure code.\
This commit is 118 commits away from our latest commit and 83 commits away from our known working commit i.e if we ran a linear algorithm and checked one commit by one we would have had to check at least 83 commits‼️ That is to say the git bisect would have been at least 11 times faster than the linear algorithm.

Dear friend, I hope this post has added a great tool to your already rich toolbox and now you can indeed find buggy commit faster than The Flash ⚡. 

If you have something you want to add about this post or just share an opinion, drop me a line in the comments section, I will be happy to read it. And if you learnt something new today, don’t forget to share this post as it may help someone else too.

Until next time, peace ✌🏾
