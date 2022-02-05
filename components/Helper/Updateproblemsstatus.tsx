import Cookies from "js-cookie";
import { getProblemsStatus } from "../api/apis";
import cloneDeep from "lodash/cloneDeep";
import { problemListI } from "../../redux/interfaces";

interface ResponseI {
  id: number;
  solved: string;
}

export const Updateproblemsstatus = async (data: problemListI[]) => {
  let refresh_token = Cookies.get("refresh");
  if (refresh_token) {
    let idArray:number[] = [];
    for (let i = 0; i < data.length; i++) {
      idArray.push(data[i].id);
    }
    let oldState = cloneDeep(data);
    try {
      let response = await getProblemsStatus.post<ResponseI[]>("/", {
        data: { ids: idArray },
      });
      for (let i = 0; i < oldState.length; i++) {
        var curr = oldState[i].id;
        for (let j = 0; j < response.data.length; j++) {
          if (curr === response.data[j].id) {
            oldState[i].solved = response.data[j].solved;
          }
        }
      }
      return oldState;
    } catch (e) {
      console.error("Token Error");
      return oldState;
    }
  }
};
