# Introduction to Data Serialization
### Why
For multiplayer games, it is important to send information quickly. To do this, we must send as little data as possible. To understand the solution, let's compare different ways to send data.

## Using strings
The first idea is to send strings as data. For example, let's send the numbers 10, 200, and 3000 as the following string:
```js
"10, 200, 3000"
```
However, there are some flaws with this approach. For strings with utf-8 encoding, each character (letter) is stored as an 8 bit integer. This means that every individual comma, space, and digit counts as a separate character. 

For example, the number 3000 is 4 characters: `3,0,0,0`. That's a total of **32 bits** for just the number 3000, while the binary equivalent, `101110111000`, can be stored in just **12 bits**.

Also, don't forget that every comma-space is an additional **16 bits**, which is even more unecessary data.

This string has 13 characters in total, which is a staggering **104 bits** total. We need a more bit-efficient solution.

## Serializing Numbers
An alternative method is to convert every number into binary, then smash them all together into a giant binary string. Let's also make sure that every single number is a **16 bit integer** for now.
```
0000000000001010 //10
0000000011001000 //200
0000101110111000 //3000

result: 000000000000101000000000110010000000101110111000
```
All the information is transfered in just **48 bits**, which is *much* less than the utf-8 string.

## Creating a Protocol
However, we need a way to turn that long byte string back into numbers. We need to know how many bits each datatype is so we can deconstruct it.

We can create a string that describes how we are going to encode that data, and send that to the server. Let's call this a **protocol**. We only need to send this protocol once in the beginning, and we will never send it again.

Let's use a simplified protocol. Note that **i16** is an abbreviation for a **16-bit integer**.
```js
["i16", "i16", "i16"]
```