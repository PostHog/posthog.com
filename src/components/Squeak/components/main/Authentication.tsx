import AuthenticationComponent from '../Authentication'
import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'
import { Provider as OrgProvider } from '../../context/org'
import { Provider as UserProvider } from '../../context/user'
import { Theme } from '../Theme'
import ErrorBoundary from '../ErrorBoundary'

type AuthenticationProps = {
    organizationId: string
    apiHost: string
    onAuth: () => void
}

export const Authentication: React.FC<AuthenticationProps> = ({
    onAuth,
    organizationId,
    apiHost
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <ErrorBoundary>
      {/* @ts-ignore */}
      <root.div ref={containerRef}>
        <OrgProvider value={{ organizationId, apiHost }}>
          <UserProvider>
            <Theme containerRef={containerRef} />
            <div className='squeak'>
        <AuthenticationComponent
          banner={{
            title: 'Please signup to post.',
            body: 'Create an account to ask questions & help others.'
          }}
          buttonText={{
            login: 'Login & post question',
            signUp: 'Sign up & post question'
          }}
          setParentView={() => {}}
          handleMessageSubmit={onAuth}
          onSignUp={onAuth}
        />
            </div>
          </UserProvider>
        </OrgProvider>
      </root.div>
    </ErrorBoundary>
  )
}
export default Authentication

