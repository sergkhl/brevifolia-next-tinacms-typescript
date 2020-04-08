import React from 'react'
import App, { AppProps } from 'next/app'
import { Tina, TinaCMS } from 'tinacms'
import { GitClient, GitMediaStore } from '@tinacms/git-client'

class MyApp extends App {
  cms: TinaCMS

  constructor(props: AppProps) {
    super(props)
    this.cms = new TinaCMS({
      sidebar: {
        hidden: process.env.NODE_ENV === 'production',
      },
    })
    const client = new GitClient('http://localhost:3000/___tina')
    this.cms.registerApi('git', client)
    this.cms.media.store = new GitMediaStore(client)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Tina cms={this.cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}
export default MyApp
