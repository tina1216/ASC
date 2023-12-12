import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const userAdmin = await prisma.user.upsert({
    where: { email: 'admin@abc.com' },
    update: {},
    create: {
      email: 'admin@abc.com',
      password: 'admin',
      name: 'admin',
      role: 'ADMIN',
    },
  })
  const user1 = await prisma.user.upsert({
    where: { email: 'abc@abc.com' },
    update: {},
    create: {
      email: 'abc@abc.com',
      password: 'abc',
      name: 'abc',
      role: 'USER',
      applications: {
        create: [
          {
            scholarship: {
              create: {
                title: 'Terran Scholarship',
                description:
                  'The Terran Scholarship is a platform for budding scholars with a passion for scientific discovery and technological innovation. With a focus on fostering excellence in the fields of Science, Technology, Engineering, and Mathematics (STEM), this scholarship aims to empower individuals who aspire to make groundbreaking contributions to the advancement of human knowledge and technology. Join us in the quest for excellence and be a part of shaping the future.',
                award: 1000,
                deadline: new Date(),
                scholarship_status: 'OPEN',
                slug: 'terran-scholarship',
                categories: {
                  create: [
                    { name: 'Science' },
                    { name: 'Technology' },
                    { name: 'Engineering' },
                    { name: 'Mathematics' },
                  ],
                },
                benefactor: {
                  create: {
                    name: 'TerraLabs Research',
                    description:
                      'Terraforming and space development is the future. TerraLabs is an extensive research network on Earth that is focused on delivering new technologies and patents for this new era. Instead of selling all their patents, they now start executing their own projects on Mars...',
                    email: 'terralabs_research@corp.com',
                    logo: '',
                  },
                },
              },
            },
          },
          {
            scholarship: {
              create: {
                title: 'Sustainable Mars Scholarship',
                description:
                  'The Sustainable Mars Scholarship is dedicated to supporting visionary individuals committed to the principles of sustainability. If you are passionate about creating a harmonious balance between human activities and the Martian environment, this scholarship provides an opportunity to contribute to the development of sustainable practices on the Red Planet. Join us in the mission to build a thriving and ecologically responsible future on Mars.',
                award: 2000,
                deadline: new Date(),
                scholarship_status: 'OPEN',
                slug: 'sustainable-mars-scholarship',
                categories: {
                  create: [{ name: 'Sustainability' }],
                },
                benefactor: {
                  create: {
                    name: 'Prisar',
                    description:
                      'Prisar is building sustainable Martian societies where residents and tourists can experience the untouched beauty of Mars. Their preservation approach makes them very popular, but also somewhat unreliable in the eyes of the Terraforming Committee.',
                    email: 'prisar@corp.com',
                    logo: '',
                  },
                },
              },
            },
          },
        ],
      },
    },
  })

  const createManyBenefactors = await prisma.benefactor.createMany({
    data: [
      {
        name: 'Saturn System',
        description:
          "Having acquired the mining rights on several of Saturn's moons, Saturn Systems gained plenty of experience over the years. As a supplier of rare metals, space ships, and fuel, the company has made itself indispensible to the outer planets. Saturn Systems is now ready to play a key role in the terraforming of Mars.",
        email: 'saturn-system@corp.com',
        logo: '',
      },
      {
        name: 'Cheung Shing Mars',
        description:
          'Asian contractor Mars Wall took an early lead in the construction of colonies and industries on Mars, making them a power to be reckoned with.',
        email: 'cheungshin-mars@corp.com',
        logo: '',
      },
      {
        name: 'Teractor',
        description:
          'Influence enough to control entire nations, and an army of lawyers and businessmen, has taken Teractor all the way to the top. And now the sky is calling. The strongest corporation on Earth wants to dominate space too...',
        email: 'teractor@corp.com',
        logo: '',
      },
      {
        name: 'Poseidon',
        description:
          'Controlling on of the first colonies has taught Poseidon how to preserve law and order. They are now contracted as law enforcement inmost  of the new colonies, giving them a valuable presence in the solar system.',
        email: 'poseidon@corp.com',
        logo: '',
      },
      {
        name: 'Arklight',
        description:
          'A new world needs a full ecosystem. Being part of a species preservation program, Arklight stands ready to introduce a variety of species to Mars.',
        email: 'arklight@corp.com',
        logo: '',
      },
      {
        name: 'Helion',
        description:
          'Developers of ultra-light solar sails, Helion now turns to the terraforming of Mars and other worlds. It promises to be a rewarding business, as Helion has already made a working model of a soletta, focusing sunlight down to the frozen planet.',
        email: 'helion@corp.com',
        logo: '',
      },
      {
        name: 'Ecoline',
        description:
          "Having developed a fast-growing lichen suitable for early terraforming, this corporation's ambition is to lead the taming of the planets, despite its relatively small size.",
        email: 'ecoline@corp.com',
        logo: '',
      },
      {
        name: 'PhoboLog',
        description:
          'Aiming to be the leader in space solutions for the Mars era, PhoboLog acquried several national space programs. This allowed them access to much existing infrastructure and technology, and they are not going to lete that advantage be wasted',
        email: 'phobolog@corp.com',
        logo: '',
      },
      {
        name: 'Robinson Industries',
        description:
          'Buying into diverse businesses, Robinson Industries is soon expected to influence all aspects of Maritan life.',
        email: 'robinson-industries@corp.com',
        logo: '',
      },
    ],
  })

  const createManyScholarships = await prisma.scholarship.createMany({
    data: [
      {
        title: 'Many Moons Scholarship',
        description:
          'The Many Moons Scholarship aims to support aspiring space enthusiasts who dream of exploring the vastness of our celestial neighbor. Whether youre interested in lunar science, astronomy, or the potential for human habitation, this scholarship is designed to fuel your passion and contribute to the next generation of moon explorers.',
        award: 4000,
        deadline: new Date(),
        scholarship_status: 'OPEN',
        slug: 'many-moons-scholarship',
        benefactorId: 1,
      },
      {
        title: 'Mars Wall Scholarship',
        description:
          'The Mars Wall Scholarship is a prestigious award for students with a keen interest in Martian colonization and terraforming. If you have innovative ideas for building a sustainable future on Mars, this scholarship is your gateway to making a significant impact on the Red Planet. Join us in the mission to turn Mars into a second home for humanity.',
        award: 25000,
        deadline: new Date(),
        scholarship_status: 'OPEN',
        slug: 'mars-wall-scholarship',
        benefactorId: 2,
      },
      {
        title: 'Million Foundation Scholarship',
        description:
          'The Million Foundation Scholarship is dedicated to supporting students with exceptional academic achievements and a commitment to making a positive impact on society. This scholarship provides financial assistance to those who aspire to create meaningful change and contribute to the betterment of our global community.',
        award: 5000,
        deadline: new Date(),
        scholarship_status: 'OPEN',
        slug: 'million-foundation-scholarship',
        benefactorId: 3,
      },
      {
        title: 'Lawful Mars Scholarship',
        description:
          'The Lawful Mars Scholarship recognizes the importance of legal expertise in the development and governance of Martian colonies. If you are passionate about law and its role in shaping the future of space exploration, this scholarship is an opportunity to contribute to the establishment of just and orderly societies beyond Earth.',
        award: 1000,
        deadline: new Date(),
        scholarship_status: 'OPEN',
        slug: 'lawful-mars-scholarship',
        benefactorId: 4,
      },
      {
        title: 'Ark of Life Scholarship',
        description:
          'The Ark of Life Scholarship is designed to support students dedicated to the preservation and promotion of biodiversity on Mars. As we embark on the journey of terraforming and colonization, this scholarship aims to foster research and initiatives that contribute to the flourishing of diverse life forms in the new Martian ecosystem.',
        award: 3500,
        deadline: new Date(),
        scholarship_status: 'OPEN',
        slug: 'ark-of-life-scholarship',
        benefactorId: 5,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
