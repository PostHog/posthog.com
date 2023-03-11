import { useRef } from 'react'
import root from 'react-shadow/styled-components'
import Authentication from '../Authentication'
import { Theme } from '../Theme'
import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
    .squeak {
        .squeak-avatar-container {
            display: none !important;
        }
        .squeak-authentication-form-container {
            margin-left: 0 !important;
        }
    }
`

type LoginProps = {
  buttonText?: any
  onSubmit: () => void
}

export const Login: React.FC<LoginProps> = ({ onSubmit, buttonText }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* @ts-ignore */}
      <root.div ref={containerRef}>
        <Theme containerRef={containerRef} />
        <Style />
        <div className='squeak'>
          <Authentication
            buttonText={buttonText}
            handleMessageSubmit={onSubmit}
          />
        </div>
      </root.div>
    </>
  )
}
