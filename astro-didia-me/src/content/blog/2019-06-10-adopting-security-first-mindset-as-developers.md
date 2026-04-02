---
template: post
title: Adopting a security-first mindset as developers
slug: adopting-security-first-mindset-as-developers
draft: false
date: 2019-06-14T11:10:00.000Z
description: >-
  Cybersecutiry is becoming so important today that we should stop considering
  security as an after-thought or leaving security to specific security team. I
  believe all software developers should embrace a security-first mindset in all
  their development activities.
category: Software Engineering
tags:
  - Software Engineering
thumbnail: /media/paid-security.jpg
---
Dear friend,

Imagine everybody in your city waking up to a notification saying you have been targeted by a nuclear bomb, you should evacuate as soon as possible. Imagine the chaos that will ensue while everybody is trying to escape… And one day later, after flying your entire family to another city, you are told it was just a hoax by some dude still living in his parents basement? You wouldn’t be happy, would you?

Well, these are things that can happen when a software system is not secured enough. Someone can misuse it in the worst possible way and cause harm or even death to others.

![A software screen alerting about hacking](/media/paid-security.jpg "Hacking detection software")

> In this internet of things age, the potential surface of attack and possible damages have grown exponentially.

Hacking has always been an issue since computer systems came into existence. But today, we are in the golden age of sophisticated hacking. Hacking is not only done by some dudes in their parents basement anymore. We now have countries setting up an army of hackers to attack other nations. My friend, we are in the age of cyber warfare. \
And to make matters worse, with the advances in the field of internet of things, everything in our lives is connected. The potential surface of attack and damages have grown exponentially. Now people can kill you by hacking into <a href="https://www.theguardian.com/technology/2016/sep/20/tesla-model-s-chinese-hack-remote-control-brakes" target="_bank" rel="nofollow noopener">your car</a> or <a href="https://nakedsecurity.sophos.com/2019/03/25/medtronic-cardiac-implants-can-be-hacked-fda-issues-alert/" target="_bank" rel="nofollow noopener">cardiac implants.</a> People are being <a href="https://www.insecam.org/en/bycountry/CA/" target="_bank" rel="nofollow noopener">spied on online</a> because their camera is connected to the internet, and they don’t even know it.

As you can see, developing a system without security in mind should not be acceptable today. It exposes people to real dangers. Of course there is a job to do in making people aware of the risks they incur by not securing their products before using them but I do believe the biggest chunk of responsibilities lie in the hands of those making the products.

> Security features should come as required by default when building customer-facing applications.

It is the responsibility of those making software to make sure what they are building is safe for end users. If you talk about an agile setting, it starts with the project owner or program manager. You don’t have to wait for the client to tell you they need security. I will be even harsher, for customer-facing applications, you don’t need clients approval to include security features. It should come as required by default. A product owner should always include some conditions of success related to security and privacy in user stories.

For instance, in our connected cameras case above, the software operating those cameras should have come with a unique password by default to allow accessing the cameras through the internet. I bet most of the users are not even aware that their videos can be viewed online by anyone with an internet connexion.

![A grid closed by a chain with padlock](/media/jose-fontano-246362-unsplash.jpg "A secured entry")
<a class="photo-caption" style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@josenothose?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Jose Fontano"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Jose Fontano</span></a>

> A security-first mindset should be part of our deontology as software developers.

After the product owner, it should be the developer’s responsibility to assure that the feature he is developing is safe for end users. Developers will be the ones ultimately building the software so it is important for them to have a security-first mindset in order to cover as much ground as possible on security. I will go as far as suggesting that this should be part of our deontology as software developers. 

To adopt a security mindset, I would suggest the following:

1. Learn as much as you can about security and privacy. At least you should know the basics about possible attacks on the kind of software you are building.
2. Whenever you are about to build a new feature, think about how the feature could be abused and used against your potential users.
3. Try to use open source software or packages only from trusted sources or at least popular libraries. Though the latter does not guarantee security, at least you have the benefits of having many eyes watching the project if it gets compromised one day.
4. If you need to use software from an untrusted source, then do some due diligence before and if you are using a dependency system, you should lock the dependency to the version you did due diligence on and update manually when you need to.
5. Be ass about security. Do not compromise on end users security. If the client insist on ditching the security features (usually because of budget constraints), make him understand the consequences and sign a liability waiver 😀… You are a professional after all.

Of course, you are probably going to miss things and have some holes in your system that you did not think about. But it is always better to reduce the risk as much as possible. By adopting a security-first mindset, you are setting yourself up for success. 

At the end of the day, going forward we will have no other choice than to build security-centric software. The <a href="https://gizmodo.com/heres-every-new-privacy-feature-apple-announced-today-1835215007" target="_blank" rel="nofollow noopener">Apple</a> and <a href="https://www.youtube.com/watch?v=Zm6ziX5pqt8" rel="nofollow noopener">Google</a> of this world have understood it (At least I hope so). Security issues are becoming more and more important with the rise of connected objects that they cannot be ignored as in the past. So it’s up to you as a developer to start learning about security and adopt a security-first mindset when building software.

Until next time, peace ✌🏾
