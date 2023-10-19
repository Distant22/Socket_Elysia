import { Elysia, t } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .ws('/ws', {
      body: t.Object({
        message: t.String(),
        classID: t.Number()
      }),
      open(ws) {
        console.warn(`The socket is opened.`)
      },
      message(ws, data) {
        ws.subscribe(`live/${data.classID}`)
        ws.publish(`live/${data.classID}`,`訊息：${data.message} ｜ 使用者 ID：${data.classID}`)
      }
  })
  .listen(8080)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
    