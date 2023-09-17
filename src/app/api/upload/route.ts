import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { nanoid } from "nanoid";

export async function GET() {
  return NextResponse.json({
    code: 400,
    msg: "请使用 POST 请求提交图片数据",
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  // 生成唯一 id
  const id = nanoid();

  // 获取表单数据
  // 来自于 Next.js 文档
  // https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body-formdata
  const formData = await req.formData();

  // 获取表单数据中 name 为 image 的数据
  // 这里的 ! 意思是 “一定不为 undefined”
  // 这里的 as 是强制类型转换
  const imageFile: File = formData.get("image")! as File;

  // 图片的文件的原始二进制数组
  const arrayBuffer = await imageFile.arrayBuffer();

  // 计算存储路径与文件名
  fs.writeFileSync(
    "./public/uploads/" +
      id +
      "." +
      imageFile.name.split(".").pop()?.toLocaleLowerCase(),
    Buffer.from(arrayBuffer)
  );

  return NextResponse.json({
    code: 0,
    msg: "success",
    data: {
      id,
    },
  });
}
