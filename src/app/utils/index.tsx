import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit'
import { toast, ToastPromiseParams } from 'react-toastify'
import { useAppDispatch } from '../hooks/hooks'

type ArgumentTypes<F extends CallableFunction> = F extends (
  ...args: infer A
) => any
  ? A[0]
  : never

export const toastPromise = <T = AnyAction | typeof createAsyncThunk,>(
  action: T,
  { pending, error, success }: ToastPromiseParams<T>,
) => {
  return (
    dispatch: ReturnType<typeof useAppDispatch>,
    actionParams?: ArgumentTypes<T & CallableFunction> | void,
  ) => {
    const promise = dispatch(
      (action as CallableFunction)(actionParams as any),
    ).unwrap()
    toast.promise(promise, {
      pending,
      error,
      success,
    })
  }
}
