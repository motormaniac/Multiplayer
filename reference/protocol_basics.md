# Protocol Rules
### Key Vocabulary
- **Struct**: Template of a container that holds values. It defines the names and datatypes of each attribute.
- **Object**: An instance of a struct (has contents of attributes)
- **Attribute**: A specific value inside a struct / object
- **Properties**: The contents of a struct. This includes `attributes`, `default`, and `extends`

***The relationship between an object and a struct is the same as an object to a class. If you don't understand this, you should research how classes work***

### High Level Definition
The protocol is a JSON object that defines how the web socket packets are serialized. Custom structs can be defined in the "structs" attribute. The output section defines a sequence of structs / types. The output data will be parsed according to this order.

An **output** property and optional **structs** property is given.
```js
const protocol = {
    "output": [
        //sequence of types
    ], 
    "structs": {
        //named structs
    },
}
```
## Struct Definition and Attributes
Each struct is a **key value** pair inside the structs attribute.
```json
"structs":{
    "struct_1":{
        //struct 1 body definition
    }, 
    "struct_2":{
        //struct 2 body definition
    },
}
```
Structs can contain multiple attributes of various types. Each attribute is defined as: `"attributeName":"type"`
```json
"struct_1":{
    "myInt":"i32",
    "myFloat":"f32",
    "myBool":"b",
}
```
Attribute types can also be custom structs that are defined. Note that struct order does not matter. structs are found based on their name. 
```json
"structs":{
    "vector3": {
        "x":"f32",
        "y":"f32",
        "z":"f32",
    }, 
    "playerState":{
        "position":"vector3", //position is of the vector3 type
        "velocity":"vector3", //velocity is too
    },
}
```
## Optional Default Property
When providing an output, it is not necessary to give an object for every single struct in the `"output"` field. Instead, the `default` property of the struct will be used to fill the vacancy.

The `default` property is optional. It allows the user to manually define what that struct should be if no object is given. If a struct does not specify a default property, then the defaults of the individual attributes are used.
```json
//the f32 type has a default value of 0
"vector3": {
    "x":"f32", //default 0
    "y":"f32", //default 0
    "z":"f32", //default 0
    
    //there is no "default" property
}
//If a specific Vector3 object is not provided, then it will make a {x:0,y:0,z:0} vector
```
Adding the default property to the struct will replace the original defaults with new default values.
```json
"classes":{
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