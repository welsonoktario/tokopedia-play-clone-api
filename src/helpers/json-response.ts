import { Response } from 'express'

export type JsonResponseType = {
  res: Response
  data?: any
  msg?: string
}

export const statusOK = ({ res, data, msg }: JsonResponseType) => {
  const body = {
    status: 'OK',
    ...(data && { data }),
    ...(msg && { msg }),
  }

  res.status(200).json(body)
}

export const statusCreated = ({ res, data, msg }: JsonResponseType) => {
  const body = {
    status: 'OK',
    ...(data && { data }),
    ...(msg && { msg }),
  }

  res.status(201).json(body)
}

export const statusNotFound = ({ res, data, msg }: JsonResponseType) => {
  const body = {
    status: 'FAIL',
    ...(data && { data }),
    ...(msg && { msg }),
  }

  res.status(404).json(body)
}

export const statusFail = ({ res, data, msg }: JsonResponseType) => {
  const body = {
    status: 'FAIL',
    ...(data && { data }),
    ...(msg && { msg }),
  }

  res.status(500).json(body)
}
