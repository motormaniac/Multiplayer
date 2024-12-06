# Protocol Rules
### Key Vocabulary
- **Struct**: Template of a container that holds values. It defines the names and datatypes of each attribute.
- **Object**: An instance of a struct (has contents of attributes)
- **Attribute**: A specific value inside a struct / object
- **Properties**: The contents of a struct. This includes `attributes`, `default`, and `extends`
- **Default**: What the attribute/struct uses when an exact value is not provided.
- **True Default**: The value to use when using `default:last` and there is no previous frame. (See `default` explanation for more details.)

***The relationship between an object and a struct is the same as an object to a class. If you don't understand this, you should research how classes work***

## Type Primitives
- `i#` A #-bit integer
    - `i8, i16, i32, i64`
    - `true default: 0`
- `u#` An unsigned #-bit integer:
    - `u8, u16, u32, u64`
    - `true default:0`
- `f#` A #-bit float:
    - `f8, f16, f32, f64`
    - `true default:0`
- `b` Single-bit boolean.
    - `1 = true, 0 = false`
    - `true default:false`
- Maybe for future: `T` For passing a struct name.

### High Level Definition
The protocol is a JSON object that defines how the web socket packets are serialized. The format is a large object holding a bunch of individual struct definitions. The `"object"` struct is special: it's the struct that the parser uses for parsing the data.
```js
const protocol = {
    "output":{
        //output definition
    },
    "struct-1":{
        //struct 1 definition
    },
    "struct-2":{
        //struct 2 definition
    },
}
```

## Struct Definition and Attributes
Each struct is a **key value** pair inside the object. Structs can contain multiple attributes of various types. Each attribute is defined as: `"attribute-name":"type"`

```json
"struct-1":{
    "my-int":"i32",
    "my-float":"f32",
    "my-bool":"b",
}
```
Attribute types can also be custom structs that are defined. Note that struct order does not matter. Also, structs are found based on their name.
```js
const protocol = {
    "vector3": {
        "x":"f32",
        "y":"f32",
        "z":"f32",
    }, 
    "player-state":{
        "position":"vector3", //position is of the vector3 type
        "velocity":"vector3", //velocity is too
    },
}
```
### Important: Structs cannot use itself as an attribute type
```json
"struct-1":{
    "inside-struct":"struct-1",
    //Error: Cannot use struct-1 as attribute type inside struct-1
}
```
*This is to avoid recursive definitions. The parser looks at struct-1, sees that it needs a struct-1, so it tries to fill it. However, this new struct-1 **also** needs a struct-1 inside of it, resulting in an endless circle.*
## Implicit Class Definition
Instead of using a class name as a type, you can give it a class definition instead. Notice how the implicit definition is exactly the same as the body of a regular class definition but without the name.
```json
"player":{
    //implicit definition of vector3
    "position": {"x":"f32", "y":"f32", "z":"f32"}
}
```
*Technically, the entire protocol could be written as a single `"output"` struct, but it would be very verbose. The named struct system allows the user to reuse the same structs multiple times, such as Vector3.*

## Optional Default Property
When providing an output, it is not necessary to give an object for every single struct in the `"output"` field. Instead, the `default` property of the struct will be used to fill the vacancy.

The `default` property is optional. It allows the user to manually define what that struct should be if no object is given. If a struct does not specify a default property, then the defaults of the individual attributes are used.
```json
//the f32 type has a default value of 0
"vector3": {
    "x":"f32", //true default 0
    "y":"f32", //true default 0
    "z":"f32", //true default 0
    
    //there is no "default" property
}
//If a specific Vector3 object is not provided, then it will make a {x:0,y:0,z:0} vector
```
Adding the default property to the struct will replace the original defaults with new default values.
```js
const protocol = {
    "vector3": {
        "x":"f32",
        "y":"f32",
        "z":"f32",

        //an object definition of vector3
        "default": {"x":1.0, "y":2.0, "z":10.0}
    },
    //If a Vector3 object is not specified, it will make a {x:1,y:2,z:10} vector

    "player":{
        "position":"vector3"
    },
    //the default of "position" comes from the vector3 default. Player default is {position:{1,2,10}}
}
```
## Special Default Keywords
There are multiple default keywords that have extra meaning.
- `last`: The value from the previous frame. ALL structs/classes use this by default.
- `true-default`: This will use the true-default value of the struct every single frame.

Important: If there is no last frame to pull from, it will use the `true-default` value instead. All attributes have a `true-default` value.

## Output Definition
The output should be follows the same formatting as any other struct.

```json
{
    "output": {
        "position":"vector3",
        "velocity":"vector3",
    },
    "vector3": {
        "x":"f32",
        "y":"f32",
        "z":"f32",
    },
}
```
To provide the output values, give the parser an object with the same attribute names. All sub-structs should also have attribute names. Here's an example:
```js
const protocol = {
    "output": {
        "position":"vector3",
        "velocity":"vector3",
    },
    "vector3": {
        "x":"f32",
        "y":"f32",
        "z":"f32",
    },
};

const output = {
    position: {x:1.0, y:2.0, z:3.0}
    velocity: {x:-1.0, y:-1.0, z:-2.0}
};

return parse(protocol, output)
```
You can ommit parts of the output object. The parser will use the default values of each struct / attribute. If you ommit an entire struct, the parser will default that entire struct.
```js
const output = {
    position:{x:1.0, y:2.0} //z will default to "last"
}