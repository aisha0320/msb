import { ArticleMetadata, getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/portfolio/ArticleCard";
import { GetStaticProps } from "next";
import { useSiteConfig } from "@/lib/useSiteConfig";
import { Nav } from "@/components/portfolio/Nav";
import { Contact } from "@/components/portfolio/Nav";
import { About } from "@/components/portfolio/About";
import { ProjectsCard } from "@/components/portfolio/projectsCard";
import { ProjectMetaData } from "@/components/portfolio/projectsCard";
import { TalkCard } from "@/components/portfolio/talk";
import Footer from "@/components/portfolio/footer";

interface HomeProps {
  articles: ArticleMetadata[];
  // projects: ProjectMetaData[];
}

export default function Home({ articles }: HomeProps) {
  const { nav, about, talks, footer } = useSiteConfig();

  const typedContact = nav.contact as Contact;

  return (
    <div className="min-h-screen bg-black border">
      <Nav
        firstName={nav.firstName}
        lastName={nav.lastName}
        links={nav.links}
        contact={typedContact}
      />
      <About
        name={about.name}
        description={about.description}
        img={about.img}
      />
      <ArticleCard articles={articles} />
      {/* <ProjectsCard projects={projects} /> */}
      <TalkCard talks={talks} />
      <Footer year={footer.year} name={footer.name} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const articles = getAllArticles();
  const { social } = useSiteConfig();

  console.log("github token", process.env.GH_TOKEN);

  const projectResponse = await fetch(
    `https://api.github.com/users/${social.github}/repos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GH_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  // const projectJson = await projectResponse.json();
  // console.log("projectJson:", projectJson)
  // // const projects: ProjectMetaData[] = projectJson.map((res: any) => {
  //   console.log(res);
  //   return {
  //     title: res.name,
  //     description: res.description,
  //     link: res.html_url,
  //   };
  // });

  return {
    props: {
      articles,
      // projects,
    },
  };
};
