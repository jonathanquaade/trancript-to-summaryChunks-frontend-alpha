import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import Button from '../components/button'

import styles from '../styles/Home.module.css'
import { styled } from '@stitches/react';
import { violet, mauve, blackA, green, gray, grayDark } from '@radix-ui/colors';

import { useState } from "react"
import axios from "axios"

const BACKEND_API = "https://transcript-to-summaryChunks-recursive-alpha-v1.jonathanquaade.repl.co"

// Your app...
const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,
  width: 500,
  boxShadow: `0 2px 10px ${blackA.blackA4}`,
});

const InnerContainer = styled('div', {
  flexGrow: 1,
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 6,
  outline: 'none',
  '&:focus': { boxShadow: `0 0 0 2px black` },
  variants: {
    variant: {
      light: {
        backgroundColor: 'white',
        color: violet.violet11,
      },
      dark: {
        backgroundColor: grayDark.gray2,
        color: 'white',
      },
    },
  },
  defaultVariants: {
    variant: 'light',
  },
});

const Box = styled('div', {});
const Flex = styled('div', { display: 'flex', gap: '1em' });

const Title = styled('div', {
  marginBottom: 20,
  color: 'black',
  fontSize: 15,
  lineHeight: 1.5,
});

const Text = styled('div', {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  variants: {
    variant: {
      active: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: mauve.mauve3, cursor: 'pointer' },
        '&:focus': { boxShadow: `0 0 0 2px ${violet.violet8}` },
      },
      disabled: {
        backgroundColor: gray.gray4,
        color: gray.gray8,
        '&:focus': { boxShadow: `0 0 0 2px black` }
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        '&:hover': { backgroundColor: green.green5, cursor: 'pointer' },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

const Fieldset = styled('fieldset', {
  all: 'unset',
  marginBottom: 15,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const Label = styled('label', {
  fontSize: 13,
  lineHeight: 1,
  marginBottom: 10,
  color: violet.violet12,
  display: 'block',
  variants: {
    variant: {
      light: {
        color: violet.violet12,
      },
      dark: {
        color: violet.violet4
      },
    },
  },

  defaultVariants: {
    variant: 'light',
  },
});

const Input = styled('input', {
  all: 'unset',
  flex: '1 0 auto',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  height: 35,
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet8}` },
});

const TextArea = styled('textarea', {
  all: 'unset',
  flex: '1 0 auto',
  borderRadius: 4,
  padding: '10px 10px',
  fontSize: 15,
  lineHeight: 1.32,
  color: violet.violet11,
  height: 400,
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet8}` },
  variants: {
    variant: {
      light: {
        color: violet.violet12,
        background: 'white',
        boxShadow: `0 0 0 1px ${violet.violet7}`,
      },
      dark: {
        color: violet.violet2,
        background: grayDark.gray3,
        boxShadow: `0 0 0 1px ${grayDark.gray7}`,
        height: 670
      },
    },
  },
  defaultVariants: {
    variant: 'light',
  },
});

const Home: NextPage = () => {

  const initialState = { title: "", transcript: "", summary: "" }
  const [data, setData] = useState(initialState)

  const updateState = (type: string, value: string) => {
    setData((data) => ({ ...data, [type]: value }))
  }
  
  const [buttonText, setButtonText] = useState("Summarise");
  const changeText = (text) => setButtonText(text);

  const submitData = async (e) => {
    changeText("Loading..")
    let result: object
    let summaryString: string
    e.preventDefault()

    // await axios(`${BACKEND_API}/v1`, {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((response) => {
    //   console.log(response);
    // }, (error) => {
    //   console.log(error);
    // });

    console.log(data.transcript)

    await axios(`${BACKEND_API}/v1`, {
      method: "post",
      data: { ...data },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.data);
      summaryString = response.data.summary.toString().replace(/,/g, " ")
      updateState("summary", summaryString)
      changeText("Summarise")

    }, (error) => {
      console.log('error', error);
    });
  }

  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Transcript To Summary Chunks-alpha</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Flex>
          <Container>
            <InnerContainer>
              <Box>
                <form onSubmit={submitData}>
                  <Title>Transcript To Summary Chunks</Title>
                  <Text>
                    Version: Alpha V1
                    <br />
                    This transformer takes in a transcript and returns a concise summary.
                  </Text>
                  <Fieldset>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" type="text" placeholder="Title of interview" onChange={(e) => updateState("title", e.target.value)} value={data.title} />
                  </Fieldset>
                  <Fieldset>
                    <Label htmlFor="transcript">Transcript</Label>
                    <TextArea id="transcript" name="transcript" onChange={(e) => updateState("transcript", e.target.value)} value={data.transcript} placeholder="Paste your transcript here" />
                    <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                      <Text>Character Count: {data.transcript.length}</Text>
                    </Flex>
                  </Fieldset>
                  <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                    <Button type="submit" variant={data.transcript.length ? 'active' : 'disabled'}
                      disabled={!data.transcript.length || buttonText == 'Loading..'}
                      value={data.summary}>{buttonText}</Button>
                  </Flex>
                </form>
              </Box>
            </InnerContainer>
          </Container>
          <Container>
            <InnerContainer variant="dark">
              <Fieldset>
                <Label variant="dark" htmlFor="summary">Output</Label>
                <TextArea variant="dark" id="summary" name="summary" placeholder="Your summary will appear here" disabled={!data.summary.length} value={data.summary} />
                <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                  <Text>Character Count: {data.summary.length}</Text>
                </Flex>
              </Fieldset>
            </InnerContainer>
          </Container>
        </Flex>

      </div>
    </div>
  )
}

export default Home
