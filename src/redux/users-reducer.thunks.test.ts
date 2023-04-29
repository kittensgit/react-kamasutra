import { APIResponseType, ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api"
import { follow } from "./users-reducer"

jest.mock('../api/users-api')

const userAPIMock = usersAPI;

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
//@ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result))

test("", async () => {
    const thunk = follow

    const dispatchMock = jest.fn() //fake dispatch

    //@ts-ignore
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
})