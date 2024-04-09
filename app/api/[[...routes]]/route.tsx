/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import {
  Box,
  Heading,
  Text,
  VStack,
  vars,
  Divider,
  HStack,
  Image,
  Row,
  Columns,
  Column,
  Icon,
  Spacer,
} from "@/app/lib/ui";
import { devtools } from "frog/dev";
import { neynar } from "frog/middlewares";
import { Title, Sections } from "@/app/constants";

// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import Head from "next/head";

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY ?? "";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  ui: { vars },
  imageAspectRatio: "1:1",
  imageOptions: { width: 1200, height: 1200 },

  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

const icons = [
  { src: "/fc2.png", text: "User Guide" },
  { src: "/secr.png", text: "Security" },
  { src: "/discover.png", text: "Discover" },
  { src: "/shared.png", text: "Share" },
];

const guides = [
  {
    icon1: { src: "/fc2.png", text: "A.Intro" },
    icon2: { src: "/users3.png", text: "B.Users" },
    icon3: { src: "/posts.png", text: "C.Casts" },
    icon4: { src: "/channels.png", text: "D.Channels" },
    icon5: { src: "/shared.png", text: "E.Share" },
    title: "The Essentials: What You Need to Know to Get Started",
  },

  {
    icon1: { src: "/discover.png", text: "F.Clients" },
    icon2: { src: "/shared.png", text: "G.Frames" },
    icon3: { src: "/shared.png", text: "H.Actions" },
    icon4: { src: "/shared.png", text: "I.Tipping" },
    icon5: { src: "/discover.png", text: "J.Bounties" },
    title: "Enhancing Your Experience: Intermediate Concepts",
  },

  {
    icon1: { src: "/discover.png", text: "K.Architecture" },
    icon2: { src: "/shared.png", text: "L.Hubs" },
    icon3: { src: "/shared.png", text: "M.Contracts" },
    icon4: { src: "/shared.png", text: "N.Govs." },
    icon5: { src: "/discover.png", text: "O.Contributions" },
    title: "Advanced Topics in Decentralized Social Media",
  },

  // ...other guides...
];

const IconBox = ({
  src,
  text,
  isMain,
  isRead,
}: {
  src: string;
  text: string;
  isMain: boolean;
  isRead?: boolean;
}) => (
  <Box
    flexDirection="column"
    width={isMain ? "128" : "96"}
    alignHorizontal="center"
    alignVertical="center"
    justifyContent="center"
    padding={isMain ? "6" : "2"}
    gap={isMain ? "4" : "2"}
    textAlign="center"
    borderStyle="solid"
    borderRadius="8"
    borderWidth={isMain ? "3" : "0"}
    borderColor="white"
  >
 
 
    <Image
      src={src}
      width={isMain ? "80" : "56"}
      height={isMain ? "80" : "56"}
      borderRadius="3"
    />
    <Box
      flexDirection="row"
      gap="4"
      alignVertical="center"
      alignHorizontal="center"
    >
      <Text
        color={isRead ? "gray" : "white"}
        size={isMain ? "24" : "20"}
        font="VT323"
      >
        {text}
      </Text>
      {isRead && <Icon name="circle-check" color="yellow" size="12" />}
    </Box>
  </Box>
);

app.frame("/", (c) => {
  return c.res({
    image: (
      <Box
        grow
        flexDirection="column"
        borderStyle="solid"
        justifyContent="flex-start"
        borderRadius="0"
        alignHorizontal="center"
        backgroundColor="bgDark"
      >
        <Row
          flexDirection="row"
          height="1/6"
          alignVertical="center"
          alignHorizontal="center"
          gap="10"
          paddingLeft="36"
          paddingRight="36"
        >
          <Image src="/users.png" width="72" height="44" />
          <Heading color="white" weight="800" font="VT323" size="64">
            NON CRYPTO STUFF
          </Heading>
          <Image src="/users.png" width="72" height="44" />
        </Row>

        <Divider color="white" />

        <Row height="5/6" width="100%">
          <Box
            flexDirection="row"
            flexWrap="wrap"
            gap="24"
            padding="6"
            paddingTop="8"
            backgroundColor="red"
            width="100%"
            height="100%"
          >
            {icons.map((icon, index) => (
              <Column flexDirection="row" gap="24" backgroundColor="green">
                <Column width="3/5" gap="12">
                  <IconBox
                    key={index}
                    src={icon.src}
                    text={icon.text}
                    isMain={true}
                  />
                </Column>
                <Column width="2/5" gap="4" backgroundColor="black">
                  <Text color="white" size="24" weight="700" font="VT323">
                    asdasdasdsd asd asdas dasdsad
                  </Text>
                </Column>
              </Column>
            ))}
          </Box>
        </Row>
        <div tw="flex items-center absolute bottom-0 w-full h-16  px-8 justify-between border-2 border-white">
          <div tw="flex items-center   ">
            <Text color="red" size="24" weight="700" font="VT323">
              NON CRYPTO STUFF/
            </Text>
            <Text color="red" size="24" weight="700" font="VT323">
              binji.eth
            </Text>
          </div>
          <Text
            color="white"
            size="24"
            weight="700"
            font="VT323"
            align="center"
          >
            Framed by @onn
          </Text>
        </div>
      </Box>
    ),

    intents: [
      <Button action="/guide">📙 Guide</Button>,
      <Button action="/start">🔒 Security</Button>,
      <Button action="/start">🔍 Discover</Button>,
      <Button action="/start">🔥 Share</Button>,
    ],
  });
});

app.frame("/guide", (c) => {
  const { inputText } = c;
  const title = inputText;
  console.log(inputText);
  return c.res({
    action: "/guide/details",
    image: (
      <Box
        grow
        flexDirection="column"
        borderStyle="solid"
        borderRadius="0"
        backgroundColor="bgDark"
      >
        <Row
          flexDirection="row"
          height="1/7"
          alignVertical="center"
          alignHorizontal="center"
          gap="10"
          paddingLeft="24"
          paddingRight="24"
        >
          <Image src="/fc2.png" width="32" height="32" />

          <Heading color="white" weight="800" font="VT323" size="48">
            FARCASTER USER GUIDE
          </Heading>
        </Row>

        <Divider color="white" />

        <Row
          grow
          height="6/7"
          flexDirection="column"
          alignItems="center"
          flex-wrap="wrap"
          alignSelf="center"
          paddingTop="12"
          gap="24"
          padding="6"
        >
          <div tw="flex items-center border-b pb-2 border-gray-200 ">
            <Text color="white" font="VT323" size="24">
              You read 4 out of 12 guides.
            </Text>
          </div>
          {guides.map((guide, index) => (
            <Box
              flexDirection="column"
              gap="8"
              borderStyle="solid"
              borderRadius="8"
              borderWidth="2"
            >
              <Box flexDirection="row" gap="12" width="100%">
                <IconBox
                  src={guide.icon1.src}
                  text={guide.icon1.text}
                  isRead={true}
                  isMain={false}
                />
                <IconBox
                  src={guide.icon2.src}
                  text={guide.icon2.text}
                  isMain={false}
                />
                <IconBox
                  src={guide.icon3.src}
                  text={guide.icon3.text}
                  isMain={false}
                />
                <IconBox
                  src={guide.icon4.src}
                  text={guide.icon4.text}
                  isMain={false}
                />
                <IconBox
                  src={guide.icon5.src}
                  text={guide.icon5.text}
                  isMain={false}
                />
              </Box>
              <Box border="white" borderWidth="2" background="white">
                <Text
                  color="black"
                  size="24"
                  weight="700"
                  font="VT323"
                  align="center"
                >
                  {guide.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Row>
        <div tw="flex items-center absolute bottom-0 w-full h-16  px-8 justify-between border-2 border-white">
          <div tw="flex items-center   ">
            <Text color="red" size="24" weight="700" font="VT323">
              NON CRYPTO STUFF/
            </Text>
            <Text color="red" size="24" weight="700" font="VT323">
              binji.eth
            </Text>
          </div>
          <Text
            color="white"
            size="24"
            weight="700"
            font="VT323"
            align="center"
          >
            Framed by @onn
          </Text>
        </div>
      </Box>
    ),
    intents: [
      <TextInput placeholder="Please write the letter of the topic and submit go topic. " />,
      <Button action="/"> 🗂️ Main Menu</Button>,
      <Button value="submit"> ✅ Go Topic</Button>,
    ],
    title: "Hello Frog",
  });
});

app.frame("/guide/details", (c) => {
  const { inputText } = c;
  const section = Sections.find((sec) => sec.value === inputText);

  return c.res({
    image: (
      <Box
        grow
        flexDirection="column"
        borderStyle="solid"
        borderRadius="0"
        backgroundColor="bgDark"
      >
        <Row
          flexDirection="row"
          height="1/7"
          alignVertical="center"
          alignHorizontal="center"
          gap="10"
          paddingLeft="24"
          paddingRight="24"
        >
          <Heading color="white" weight="800" font="VT323" size="32">
            Guide /
          </Heading>
          <Icon name={section.icon} color="white" size="24" />
          <Heading color="white" weight="800" font="VT323" size="32">
            {section.text}
          </Heading>
        </Row>
        <Divider color="white" />
        <Row
          grow
          height="6/7"
          flexDirection="column"
          alignItems="flex-start"
          flexWrap="wrap"
          width="100%"
          gap="2"
          padding="12"
        >
          {section.content.map((item, index) => (
            <Box
              key={index}
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              gap="4"
              padding="4"
            >
              <Box background="white" padding="1" paddingLeft="8" width="100%">
                <Text color="black" size="24" weight="700" font="VT323">
                  {item.title}
                </Text>
              </Box>

              <Box
                key={index}
                flexDirection="row"
                alignItems="flex-start"
                width="100%"
                gap="8"
                padding="4"
              >
                <Column
                  key={index}
                  flexDirection="column"
                  gap="8"
                  width={item.image ? "4/5" : "1/1"}
                >
                  {item.paragraphs.map((paragraph, paragraphIndex) => (
                    <Box>
                      <Text
                        key={paragraphIndex}
                        color="white"
                        size="20"
                        weight="700"
                        font="borlow"
                        align="center"
                      >
                        {paragraph}
                      </Text>
                    </Box>
                  ))}
                </Column>
                {item.image && (
                  <Column
                    width="1/5"
                    flexDirection="column"
                    gap="8"
                    borderStyle="solid"
                    justifyContent="flex-start"
                  >
                    <Image src={item.image} />
                  </Column>
                )}
              </Box>
            </Box>
          ))}
        </Row>
      </Box>
    ),
    intents: [
      <Button action="/">🗂️ Main Menu</Button>,
      <Button>🖍️ Quiz(soon)</Button>,
      <Button action="/guide">⬅️ Back to Guide</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
