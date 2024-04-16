import validator from "validator";
import z from "zod";
import { zfd } from "zod-form-data";

/**
 * FormDataのスキーマー、zfdを使う。
 * @see https://github.com/airjp73/remix-validated-form/tree/main/packages/zod-form-data
 * @see https://zod.dev/?id=basic-usage
 * @see https://github.com/validatorjs/validator.js
 */
export const ReserveDetail = zfd.formData({
  realName: zfd.text(),
  tel: zfd.text(z.string().refine(validator.isMobilePhone)),
  time: zfd.numeric(z.number().nonnegative()),
});

export const ReserveData = zfd.formData({
  unixTime: zfd.numeric(z.number().nonnegative()),
});

/**
 * APIのレスポンスのスキーマー、zodを使う。
 */
export const ReserveDataResponse = z.object({
  name: z.string(),
  tel: z.string(),
  time: z.number(),
});

/**
 * APIのエラーレスポンスのスキーマー、zodを使う。
 */
export const ErrorResponse = z.object({
  message: z.string(),
});
