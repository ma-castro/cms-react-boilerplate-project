import { ModuleFields, TextField } from '@hubspot/cms-components/fields'
import React from 'react'

export const fields = (
  <ModuleFields>
    <TextField
      label='Loading Text Prompt'
      name='loading_prompt'
      default="Just a moment - we're loading something special, just for you…"
      required
    />
  </ModuleFields>
)
