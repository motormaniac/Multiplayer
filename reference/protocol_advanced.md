# Advanced Struct Tools
## Struct Extending
Sometimes, you may want to make a struct that is very similar to another struct. Instead of rewriting every single attribute, you can use the **optional** `extends` property.

This extended class now has all of the same properties as the original. Without affecting the original struct at all.

*At the current states, you can only extend **one** struct at a time.*
```js
const protocol = {
    "vector3":{
        "x":"f32",
        "y":"f32",
        "z":"f32",
    },
    "vectorClone":{
        "extends":"vector3"
        //these come from original
        // "x":"f32",
        // "y":"f32",
        // "z":"f32",
    }
}
```
Extended clases can also add new properties. Here are some examples:

```js
const protocol = {
    //original class
    "vector3":{
        "x":"f32",
        "y":"f32",
        "z":"f32",
    },

    //A vector that can be null
    "nullableVector":{
        //boolean --> true indicates null vector
        "isNull":"b"
        "extends":"vector3",
    },

    //creates a vector struct with a custom default
    "vector_default_1":{
        "extends":"vector3",
        "default": {"x":1, "y":1, "z":1}
    },

//By extending, you can make structs that have attribute types of themselves.
    "chainedVector":{
        "extends":"Vector3",
        "linkedVector":"Vector3"
    },
}
```

## Nulling Properties
There may be some times where you want to keep most of the same properties, but you want to remove some of them. This is when you would null properties.

Use the special type `null` to remove these properties. This keyword only works in extended classes.
```json
{
    "vector3":{
        "x":"f32",
        "y":"f32",
        "z":"f32",
    },
    "new-vect":{
        "extends":"vector3",
        "x":"null",
    }
}

//when new-vect is evaluated it looks like this:
"new-vect":{
    //the x attribute is removed
    "y":"f32",
    "z":"f32",
}
```
You can also remove defaults:
```json
{
    "vector3":{
        "x":"f32",
        "y":"f32",
        "z":"f32",

        "default":"true-default"
    },
    "non-default-vect":{
        "extends":"vector3",
        "default":"null",
    }
}
```
*Because default is removed, non-default-vect will fall back to `default:last`*

## Implicit Extends
Extend and Implicits used together can make very powerful definitions. (You can do this without extends, but this is just another way to do it.)
```json
{
    //Setting the default of only one attribute
    "vector3":{
        "x":{"extends":"f32", "default":"true-default"},
        "y":"f32",
        "z":"f32",
    }
}
```





<br><br><br><br><br><br><br><br><br>
# Special Datatypes (Maybe Later)
These do not exist yet!

You can extend `i, u, f` to specify how many bits you want to use
```json
"struct-1":{
    "4-bit-int": {
        "extends":"i",
        "bits":4
    }
}
```

Array will be added if/when `T` types are supported

Some datatypes require you to extend in order to use them. For example, this is the built-in definition of array:
```json
"array":{
    "type":"T",s
    "length":"u8",
}