import prisma from "./prisma";

export async function upsertUserWithRelations(user: any) {
  console.log("upsertUserWithRelations", user);
  // Upsert User
  const upsertedUser = await prisma.user.upsert({
    where: {
      fid: user.fid,
    },
    create: {
      fid: user.fid,
      name: user.display_name,
      avatar: user.pfp_url,
      username: user.username,
      displayname: user.display_name,
      followers: user.follower_count,
      following: user.following_count,
      createdAt: new Date(),
      verifiedAddresses: {
        create: {
          ethAddresses: user.verified_addresses.eth_addresses,
          solAddresses: user.verified_addresses.sol_addresses,
        },
      },
    },
    update: {
      name: user.display_name,
      avatar: user.pfp_url,
      username: user.username,
      displayname: user.display_name,
      followers: user.follower_count,
      following: user.following_count,
      verifiedAddresses: {
        upsert: {
          create: {
            ethAddresses: user.verified_addresses.eth_addresses,
            solAddresses: user.verified_addresses.sol_addresses,
          },
          update: {
            ethAddresses: user.verified_addresses.eth_addresses,
            solAddresses: user.verified_addresses.sol_addresses,
          },
        },
      },
    },
  });

  return upsertedUser;
}

export async function markSectionAsRead(fid: number, sectionValue: string) {
  await prisma.userSectionRead.create({
    data: {
      fid: fid,
      sectionValue: sectionValue,
      readAt: new Date(),
    },
  });
}
 
export async function getGuides(fid: number): Promise<any> {
  // Fetch all sections from the database
  const sections = await prisma.section.findMany({
    orderBy: { value: 'asc' },
    include: {
      userSectionReads: {
        where: { fid },
        select: { sectionValue: true },
      },
    },
  });

  // Define the guide titles
  const titles: string[] = [
    "The Essentials: What You Need to Know to Get Started",
    "Enhancing Your Experience: Intermediate Concepts",
    "Advanced Topics in Decentralized Social Media",
  ];

  // Group the sections into sets of five and map them to the guide format
  const guides = sections.reduce((acc: any[], section, index) => {
    const guideIndex = Math.floor(index / 5);
    if (index % 5 === 0) {
      acc.push({ title: titles[guideIndex] || "Additional Topics" }); // Fallback title for extra sections
    }

    const currentGuide = acc[guideIndex];
    const iconKey = `icon${(index % 5) + 1}` as keyof typeof currentGuide;
    currentGuide[iconKey] = {
      src: section.icon || 'default_icon_path', // Provide a default path if icon is undefined
      text: `${section.value}.${section.text}`,
      value: section.value,
      isRead: section.userSectionReads.some(read => read.sectionValue === section.value),
    };

    return acc;
  }, []);

  return guides;
}