import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { css } from '@emotion/react'
import { isEmpty } from 'lodash'

type InputProps = {
  name: string
  inputText?: string
  setInputText: Dispatch<SetStateAction<string>>
  placeholder: string
}

const InputText = ({
  name,
  placeholder,
  inputText,
  setInputText,
}: InputProps) => {
  return (
    <input
      css={input}
      name={name}
      value={isEmpty(inputText) ? undefined : inputText}
      placeholder={placeholder}
      onChange={(e) => setInputText(e.target.value)}
    />
  )
}

const input = css`
  padding: 8px;
  border-radius: 8px;
`

export default InputText
