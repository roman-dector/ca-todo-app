const __brand: unique symbol

type Brand<T> = T & { readonly [__brand]: unique symbol }

type Keys<T> = keyof T
type Values<T> = T[Keys<T>]

type InstanceValues<T> = InstanceType<Values<T>>
