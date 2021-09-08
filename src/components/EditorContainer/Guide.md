This is a guide to help you create rich notes on OneNotion.

OneNotion supports rich markdown features.

# Features

-   Create, Edit and Delete Note.
-   Share note as web page.
-   Markdown support.

# Headers

Hashnode supports Atx-style headers. Use 1-6 hash characters at the start of the
line, corresponding to header levels 1-6. For example:

```
# This is Heading 1
## This is Heading 2
### This is Heading 3
#### This is Heading 4
##### This is Heading 5
###### This is Heading 6
```

# Code Snippets

#### Inline code

Use the Grave accent keys ` for the inline code snippets.

This is a normal sentence with `some code` in it.

The above will output the following: This is a normal sentence with some code.

Block code Wrap the code blocks with tripple Grave accent keys. ``` for showing
big blocks of code in your content. For example:

```
if (isServer && user) {
    store.userStore.currentUser = user;
}
```

The above will look like: (OneNotion supports generic code highlighting. Most of
the time, it will be applied to the code blocks after you publish the content.)

```
if (isServer && user) {
    store.userStore.currentUser = user;
}
```

# Text formatting

**Bold**: Wrap the text with double astricks ** to make it bold. We will use
<strong></strong> while parsing. For example: **Bold text\*\*

_Italics_: Wrap the text with single astricks character * to make it italics.
For example: *Italic text\*. We will wrap the text with <em></em> tag while
parsing.

The bold and italics markdown syntax works inside almost any block level
elements. Like Quotes, Lists, Inline code, etc.

# Quotes

Use the greater than sign to format a text as a quote. For example:

> Where there is a will there is a way!

# Links

I'm an inline link: [I'm an inline link](put-link-here)
