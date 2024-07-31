import Head from "next/head"
import React from "react"
import CompletedLayout from "../components/layout/completed-layout"

const CompletedPage = () => {
  return (
    <>
      <Head>
        <title>Order completed!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <meta name="description" content="One-page checkout" />
      </Head>
      <CompletedLayout />
    </>
  )
}

export default CompletedPage
