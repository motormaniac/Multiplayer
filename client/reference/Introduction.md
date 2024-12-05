# Introduction to Data Serialization
### Why
For multiplayer games, it is important to send information quickly. To understand the solution, let's compare different ways to send data.

### Using strings
The first idea is to send strings as data. For example, let's send the numbers 1, 2, and 3 as the following string:
```
"1, 2, 3"
```