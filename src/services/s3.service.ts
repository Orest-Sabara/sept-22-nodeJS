import { extname } from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";

import { configs } from "../configs";

class S3Service {
  constructor(
    private client = new S3Client({
      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
      },
    })
  ) {}

  public async uploadPhoto(
    file: UploadedFile, //файл
    itemType: string, //тип файлу
    itemId: string //Id юзера
  ): Promise<string> {
    const filePath = this.buildPath(file.name, itemType, itemId);

    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath, // для Bucket, щоб він знав куди покласти
        Body: file.data, // дані
        ContentType: file.mimetype, // тип файлу для Bucket
        ACL: configs.AWS_S3_ACL, // права для даного фото |  public
      })
    );

    return filePath;
  }

  public async deletePhoto(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
      })
    );

  }

  private buildPath(
    fileName: string,
    itemType: string,
    itemId: string
  ): string {
    return `${itemType}/${itemId}/${v4()}/${extname(fileName)}`;
    // https://user/idUser/random/.png
  }
}

export const s3Service = new S3Service();
