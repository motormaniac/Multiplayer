# Protocol Rules
The protocol is a JSON object that defines how the web socket packets are serialized. Custom classes can be defined in the "classes" attribute. The output section defines a list of objects that will be serialiazed sequentially.
<br><br>
An **output** property and optional **classes** property is given.
```js
const protocol = {
    "output": [
        //objects in a given order
    ], 
    "classes": {
        //named classes
    }
}
```
## Class Declaration and Variables
Each class is a **key value** pair inside the classes attribute.
```json
"classes":{
    "class_1" : {
        //class 1 body declaration
    }, 
    "class_2" : {
        //class 2 body declaration
    }
}
```
Classes can contain multiple variables of various types. Each variable is defined as: `"variableName":"type"`
```json
"class_1" : {
    "myInt" : "i32",
    "myFloat" : "f32",
    "myBool" : "b",
}
```
Variables types can also be custom classes that are defined. Note that class order does not matter. Classes are found based on their name. 
```json
"classes":{
    "vector3": {
        "x":"f32",
        "y":"f32",
        "z":"f32",
    }, 
    "playerState" : {
        "position":"vector3" //position is of the vector3 type
        "velocity":"vector3" //velocity is too
    }
}
```
## Optional Default Property
Every class may use an optional default property. This allows the user to define what the default value(s) of the class is when specific values are not given.
<br><br>
If a class does not specify a default property, then the defaults of the individual variables are used.
```json
//the f32 type has a default value of 0
"vector3": {
    "x":"f32", //default 0
    "y":"f32", //default 0
    "z":"f32", //default 0
}
//If a specific Vector3 object is not provided, then it will make a {x:0,y:0,z:0} vector
```
Adding the default property to the class will replace the original defaults with new default values.
```json
"vector3": {
    "x":"f32",
    "y":"f32",
    "z":"f32",

    //if a vector3 property is not specified 
    "default": {"x":1.0, "y":2.0, "z":10.0} //an object definition of vector3
}
//If a Vector3 object is not specified, then it will make a {x:1,y:2,z:10} vector
```
"vector3": {
    ...

}