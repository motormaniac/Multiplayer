//bytearray is a temporary substitute for the actual byte array. Each value in the bytearray is a sub-array: [bitlength, value]
let bytearray = [];

const protocol = {
    "output":{
        "position":"vector3"
    },
    "vector3":{
        "x":"f8",
        "y":"f16",
        "z":"f32",

        "default":{"x":1, "y":2,"z":10}
    },
}

let output = {
    
}

// let last = output;
let last = {
    // position:{x:1,y:2,z:3}
}

const Primitives = {
    "b":{true_default:0, size:1},
    "i8":{true_default:0, size:8},
    "i16":{true_default:0, size:16},
    "i32":{true_default:0, size:32},
    "i64":{true_default:0, size:64},
    "u8":{true_default:0, size:8},
    "u16":{true_default:0, size:16},
    "u32":{true_default:0, size:32},
    "u64":{true_default:0, size:64},
    "f8":{true_default:0, size:8},
    "f16":{true_default:0, size:16},
    "f32":{true_default:0, size:32},
    "f64":{true_default:0, size:64},
}

function addValue(type, content) {
    let contentVal;
    switch(type) {
        case "b":
            contentVal = content===true ? 1 : 0;
            break;
        default:
            contentVal = content;
            break;
    }
    bytearray.push(Primitives[type].size, contentVal);
}

function compileProtocol() {
    //loose equality to check if output is either null or undefined (doesn't exist)
    if (protocol.output == undefined || typeof protocol.output !== "object") {
        console.log(`No output struct found in ${protocol}`);
        return;
    }
    
    compileStruct(bytearray, protocol.output, output, last);
}

/**
 * Takes the protocol and output values, recursively goes through the branches, appends new byte data to bytearray.
 * All of these paramaters refer to the current sub-struct/branch that this function is in.
 * @param {Array<number>} bytearray the bytearray to parse to 
 * @param {object} protocol_struct The protocol (attribute types)
 * @param {object} output_struct The number values to be parsed from this frame
 * @param {object} last_struct The values from last frame
 * @returns {void}
 */
function compileStruct(bytearray, protocol_struct, output_struct, last_struct) {
    /** List of all keys in this protocol_struct */
    let protocol_keys = Object.keys(protocol_struct);
    // /** List of all keys in this output_struct */
    // let output_keys = Object.keys(output_struct);

    for (let /** The current key in protocol_struct that we are iterating over*/ key of protocol_keys) {
        console.log(bytearray);
        
        if (typeof key !== "string") {
            //This should never happen because all JSON keys are strings
            console.log(`Error: ${key} is not a string type. Please use valid json`);
            continue;
        }
        /** protocol_struct[protocol_key] --> The value of this specific property in the protocol */
        let type = protocol_struct[key];

        switch (key) {
            case "extends":
            case "default":
                break;
            default: //This property must be an attribute

                if (type == undefined) {
                    console.log(`Warning: ${key} has an undefined type definition`);
                    continue;
                }

                if (typeof type === "object") { //implicit class definition
                    compileStruct(
                        bytearray,
                        type, 
                        key in output_struct ? output_struct[key] : {},
                        key in last_struct ? last_struct[key] : {},
                    );

                } else if (typeof type === "string") {
                    if (type in Primitives) { //if this attribute is a primitive type

                        if (key in output_struct) { //if the output contains this attribute, use that
                            addValue(type, output_struct[key]);

                        } else if ("default" in protocol_struct && protocol_struct["default"] != undefined && key in protocol_struct["default"]) {
                            //otherwise if default exists, use that

                            //Set attribute count to the length of the keys list, then subtract 1 if there's a default and/or an extends
                            // let attribute_count = protocol_keys.length;
                            // attribute_count -= protocol_keys.includes("default") ? 1 : 0;
                            // attribute_count -= protocol_keys.includes("extends") ? 1 : 0;

                            // if (attribute_count === 1) {
                            //     addValue(type, protocol_struct["default"]);
                            // } else if (key in protocol_struct["default"]) {
                                let default_value;
                                switch(protocol_struct["default"][key]) { //check what default is
                                    case "last":
                                        default_value = last_struct[key]
                                        break;
                                    case "true-default":
                                        default_value = Primitives[type].true_default;
                                    default:
                                        default_value = protocol_struct["default"][key]
                                        break;
                                }
                                addValue(type, default_value);
                            // }
                        } else if (key in last_struct) { //if no default property is specified, use last default
                            addValue(type, last_struct[key]);
                        } else { //finally if no last default exists, then use the true default
                            addValue(type, Primitives[type].true_default);
                        }
                    } else { //else this attribute is a struct ref type (not a primitive)
                        //check if the global protocol object contains the struct reference
                        if ( ! type in protocol) {
                            console.log(`Error: Could not find struct reference ${type} in ${protocol_struct}`)
                            continue;
                        }
                        compileStruct(
                            bytearray,
                            protocol[type], //the global struct reference
                            key in output_struct ? output_struct[key] : {},
                            key in last_struct ? last_struct[key] : {}
                        )
                    }
                    
                } else { //This attribute datatype is neither a string or an object
                    console.log(`Warning: Invalid datatype for ${key}:${type}`);
                    continue;
                } break;
        }
    }
}

compileProtocol();
console.log(bytearray);