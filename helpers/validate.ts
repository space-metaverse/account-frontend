import * as Yup from 'yup'
import type { AssertsShape, Assign, ObjectShape } from 'yup/lib/object'

/**
 * Create request for
 * validate edit and create.
 */
export default ({
  error: (err: Error) => {
    if (err instanceof Yup.ValidationError) {
      const messages: Record<string, string> = {}

      err.inner.forEach((validate) => {
        messages[validate.path ?? 0] = validate.message
      })

      return messages
    }
  },

  request: async <T>(
    data: T | null,
    shape: Record<string, any>
  ): Promise<AssertsShape<Assign<ObjectShape, Record<string, any>>>> => {
    return await Yup.object()
      .shape(shape ?? {})
      .validate(data, {
        abortEarly: false
      })
  }
})
