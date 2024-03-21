import { BACKEND_URL } from "./Constants";

export const userStates = async (userId : string | undefined) => {
    const res = await fetch( BACKEND_URL + "/pomodoro/data", {
      method: "POST",
      body: JSON.stringify({
        userId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = await res.json()
    return data
}
