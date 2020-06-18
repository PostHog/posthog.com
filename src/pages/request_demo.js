import React from 'react'
import Layout from '../components/Layout'
import { StartupForm } from './startups'

function submitForm(e) {
  e.preventDefault()
  var data = {}
  data['form'] = 'Demo Request'
  data['firstName'] = document.getElementById('firstName').value
  data['lastName'] = document.getElementById('lastName').value
  data['email'] = document.getElementById('email').value
  data['company'] = document.getElementById('company').value

  var xhr = new XMLHttpRequest()
  xhr.open(
    'POST',
    'https://8qyzxcmhxf.execute-api.us-east-1.amazonaws.com/Prod/submitForm',
    true
  )
  xhr.setRequestHeader('Accept', 'application/json; charset=utf-8')
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  xhr.send(JSON.stringify(data))

  xhr.onloadend = response => {
    if (response.target.status === 200) {
      window.location.href = '/application-received'
    } else {
      alert('error, please email hey@posthog.com')
      console.error(JSON.parse(response.target.response).message)
    }
  }
}

const RequestDemoPage = () => {
  return (
    <Layout>
      <StartupForm
        title="Request Demo"
        startup={false}
        onSubmit={submitForm}
      ></StartupForm>
    </Layout>
  )
}

export default RequestDemoPage
