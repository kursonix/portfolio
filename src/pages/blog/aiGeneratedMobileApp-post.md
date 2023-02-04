---
layout: "../../layouts/BlogPost.astro"
title: "AI Generated mobile app UI"
description: "Let's try build mobile app UI with the help of AI"
pubDate: "Jan 31 2023"
---

With the growing popularity of AI tools, we look at one of them to check if it can help us with building Mobile App UI. What we are going to build is a mobile app for meditation.
In our work, we will use React Native and expo.

The AI tool that will work for us today is _[Midjourney Bot](https://midjourney.com/home)_. This bot is used in creating graphics in response to text prompts. So in our case, it should substitute the designer.

Midjourney Bot works in Discord app. After login in and granting access you can start and type commands. It can be tested for free.

## Creating assets

Our first command is.

```
/imagine mobile app ui design, meditation, colour palette,
Behance, Printerest, dribbble::3 --v 4 --q 2
```

The word **/imagine** starts our command. The last number **::3** add weight to word,
**--v 4** ask the bot to use version 4 of midjourney, **--q 2** set quality of the picture.
This gives us that result.

![Ai boot renders](/assets/posts/aiGeneratedMobileApp/1.png)

Selecting one of the **U1-4** options asks the bot to upscale this particular version of the render. You can also ask boot to render more variation of the given version by selecting **V1-4**. I selected version U1 and the result we get looks like this.

![AI boot final render](/assets/posts/aiGeneratedMobileApp/2.png)

We will use this version as the layout of our app.

## Home screen

We start our work with the Home screen.

![Home screen](/assets/posts/aiGeneratedMobileApp/3.png)

At first, I set the background color as a gradient, then I cut the tree from the render. Unfortunately, the resolution is not good. But we can overcome this by using this image to generate
higher resolution photo by midjourney bot. I do it in that way

```
/imagine https://s.mj.run/KqIK11NRzXA foliage tree
Behance, Printerest, dribbble::3 --v 4 --q 2
```

Url points to our tree image, further instead of rendering a mobile version I ask bot to render a photo. The result we get.

![Home screen](/assets/posts/aiGeneratedMobileApp/4.png)

As earlier I upscale one of them and use the tool to remove the background from an image. I choose _[remove.bg](https://www.remove.bg/upload)_.

Next, I choose a font similar to the render one, create buttons and position elements. The final result of the Home screen look like this

![Home screen final](/assets/posts/aiGeneratedMobileApp/5.png)

## Details screen

The second screen that we are going to build is Details screen

![Details screen](/assets/posts/aiGeneratedMobileApp/6.png)

I have to say that I have a problem with the background image. Getting it from the render is a little bit tricky for me, but we will try to find a way.
So to start we need to get a raw background image. To do this we have to remove buttons and text. To do this I use _[cleanup.pictures](https://cleanup.pictures/)_. As before our background image is not in good resolution. So we will use the midjourney bot once again.
I put as the input our image, in that way midjourney will preserve the style of the image.

![Background Image](/assets/posts/aiGeneratedMobileApp/7.png)

I choose option 4.

As before I put texts and buttons like in our render. And the final result is.

![Background Image Final](/assets/posts/aiGeneratedMobileApp/8.png)

## Summary

So we build simple UI with the help of AI. I think it is a great tool especially in the first phase of our work when we have to do some conceptual work. With a couple of text prompts, we can get some idea of what our feature app can look like.
