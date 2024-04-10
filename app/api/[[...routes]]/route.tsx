/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import prisma from "@/app/lib/prisma";
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
  Column,
  Icon,
  Spacer,
} from "@/app/lib/ui";
import { devtools } from "frog/dev";
import { neynar } from "frog/middlewares";
import { Title, Sections, icons, guides } from "@/app/constants";
import {
  upsertUserWithRelations,
  markSectionAsRead,
  getGuides,
} from "@/app/lib/db";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import Head from "next/head";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY ?? "";

const client = new NeynarAPIClient(NEYNAR_API_KEY);

// Usage:

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  verify: "silent",
  ui: { vars },
  imageAspectRatio: "1:1",
  imageOptions: { width: 1000, height: 1000 },
  headers: {
    'cache-control': 'max-age=0',
  }
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

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
      width={isMain ? "80" : "64"}
      height={isMain ? "80" : "64"}
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

        <Row 
          height="5/6"
          width="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingBottom="38"
        >

          <Box 
          allignItems="center"
          alignVertical="center"
          alignHorizontal="center"
          padding="24"
          >
            <Text color="white" size="24" weight="700" font="VT323" align="center"
            wrap="balance"
            >
              Welcome to Non Crypto Stuff! Dive into our collection of guides, tips, and tricks designed to enhance your journey with us. Unlock the full potential of your experience and discover how to make the most of every moment.
            </Text>
            </Box>
          <Box
            flexDirection="row"
            flexWrap="wrap"
            gap="24"
            padding="6"
            paddingTop="8"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            {icons.map((icon, index) => (
              <Column key={index} flexDirection="column" gap="24" width="1/4">
                <IconBox
                  src={icon.src}
                  text={icon.text}
                  isMain={true}
                />
                <Text color="white" size="24" weight="700" font="VT323">
                  {icon.description}
                </Text>
              </Column>
            ))}
          </Box>
        </Row>
        <div tw="flex items-center absolute bottom-0 w-full h-16  px-8 justify-between border-t-2  border-white">
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
      <Button action="/security">🔒 Security</Button>,
      <Button action="/discover">🔍 Discover</Button>,
      <Button.Link href="https://warpcast.com/~/compose?text=Non%20Crypto%20Stuff%20Channel&embeds[]=https%3A%2F%2Fnon-crypto-stuff-frame.vercel.app%2F">🔥 Share</Button.Link>,
    
    ],
  });
});


app.frame("/security", (c) => {
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
          height="1/7"
          alignVertical="center"
          alignHorizontal="center"
          gap="10"
          paddingLeft="12"
          paddingRight="12"
        >
          <Image src="/seca.png" width="48" height="48" />

          <Heading color="white" weight="900" font="VT323" size="48">
            FARCASTER SECURITY GUIDE
          </Heading>
        </Row>
        <Divider color="white" />

        <Row
          flexDirection="row"
          height="6/7"
          alignVertical="center"
          alignHorizontal="center"
          gap="10"
          paddingLeft="12"
          paddingRight="12"
        >
       
          <Icon name="lock" color="white" size="48" />
          <Heading color="white" weight="900" font="VT323" size="48">
            SECURITY GUIDE SOON
          </Heading>
        </Row>
         
      </Box>
    ),

    intents: [
      <Button action="/">📙 Main Menu</Button>,
 
    ],
  });
});


app.frame("/discover", (c) => {
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
          height="1/7"
          alignVertical="center"
          alignHorizontal="center"
          gap="10"
          paddingLeft="12"
          paddingRight="12"
        >
          <Image src="/seca.png" width="48" height="48" />

          <Heading color="white" weight="900" font="VT323" size="48">
           DISCOVER CHANNELS AND PEOPLE
          </Heading>
        </Row>
        <Divider color="white" />

        <Row
          flexDirection="row"
          height="6/7"
          alignVertical="center"
          alignHorizontal="center"
          gap="10"
          paddingLeft="12"
          paddingRight="12"
        >
       
       
          <Heading color="white" weight="900" font="VT323" size="48">
          DISCOVER PEOPLE & CHANNELS BY LLM , SOON
          </Heading>
        </Row>
         
      </Box>
    ),

    intents: [
      <Button action="/">📙 Main Menu</Button>,
 
    ],
  });
});


app.frame("/guide", async (c) => {
  const { frameData } = c;
  const { buttonIndex, fid, castId } = frameData;
  if (fid) {
    const fidArray = [fid]; // Convert fid to an array
    const userData = await client.fetchBulkUsers(fidArray);
    const user = userData.users[0];
    try {
      const updatedUser = await upsertUserWithRelations(user);
    } catch (error) {
      console.error(`Operation failed with error: ${error}.`);
    }
  } else {
    console.error("fid is undefined");
  }

  console.log("fid", fid);

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
          paddingLeft="12"
          paddingRight="12"
        >
          <Image src="/fc2.png" width="32" height="32" />

          <Heading color="white" weight="900" font="VT323" size="48">
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
          <div tw="flex items-center border-b pb-2 border-gray-200 pt-2 ">
            <Text color="white" font="VT323" size="24">
      
            </Text>
          </div>
          {guides.map((guide, index) => (
            <Box
              key={index}
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
                  isRead={false}
                  isMain={false}
                />
                <IconBox
                  src={guide.icon2.src}
                  text={guide.icon2.text}
                  isRead={false}
                  isMain={false}
                />
                <IconBox
                  src={guide.icon3.src}
                  text={guide.icon3.text}
                  isRead={false}
                  isMain={false}
                />
                <IconBox
                  src={guide.icon4.src}
                  text={guide.icon4.text}
                  isRead={false}
                  isMain={false}
                />
                <IconBox
                  src={guide.icon5.src}
                  text={guide.icon5.text}
                  isRead={false}
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
        <div tw="flex items-center absolute bottom-0 w-full h-16  px-8 justify-between border-t-2  border-white">
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
      <TextInput placeholder="Write int letter ex:a for Intro " />,
      <Button action="/"> 🗂️ Main Menu</Button>,
      <Button value="submit"> ✅ Go Topic</Button>,
    ],
    title: "Hello Frog",
  });
});

app.frame("/guide/details", async (c) => {
  const { inputText } = c;
  const section = Sections.find(
    (sec) => sec.value.toLowerCase() === inputText.toLowerCase()
  );
  const fid = c.frameData.fid;
  const sectionValue = section?.value;

  const userSectionReadExists = await prisma.userSectionRead.findUnique({
    where: { fid_sectionValue: { fid: fid, sectionValue: sectionValue } },
  });

  if (!userSectionReadExists) {
    try {
      await markSectionAsRead(fid, sectionValue);
    } catch (error) {
      console.error(`Failed to mark section as read: ${error}`);
    }
  }

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
