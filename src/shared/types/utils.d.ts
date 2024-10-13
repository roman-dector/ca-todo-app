const __brand: unique symbol

type Brand<T> = T & { readonly [__brand]: unique symbol }
