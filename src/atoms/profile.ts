import axios from "axios";
import { atom, atomFamily, selector } from "recoil";

// export const lcUsernameAtom = atom({
//     key: "lcUsername",
//     default: "",
// });
// export const cfUsernameAtom = atom({
//     key: "cfUsername",
//     default: "",
// });

// export const gfgUsernameAtom = atom({
//     key: "gfgUsername",
//     default: "",
// });

const lcUsername = "Himanshu_Bijja"

export const lcUserdata = atom({
    key : "lcUserdata",
    default : selector({
        key : "lcUserdataSelector",
        get : async ({get}) => {
            const response = await axios.get(`http://localhost:3000/api/user/leetcode?lcusername=Himanshu_Bijja`);
            return response.data.source;
        }
    })
})


