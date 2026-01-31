import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Icon,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes, social } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

function Hero() {
  const githubLink =
    social.find((item) => item.name === "GitHub")?.link ??
    "https://github.com/ShahzebX";

  return (
    <Column fillWidth horizontal="center" gap="m">
      <Column maxWidth="s" horizontal="center" align="center">
        {home.featured.display && (
          <RevealFx
            fillWidth
            horizontal="center"
            paddingTop="16"
            paddingBottom="32"
            paddingLeft="12"
          >
            <Badge
              background="brand-alpha-weak"
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
        )}
        <RevealFx
          translateY="4"
          fillWidth
          horizontal="center"
          paddingBottom="16"
        >
          <Heading wrap="balance" variant="display-strong-l">
            Computer Vision Engineer who ships models to production
          </Heading>
        </RevealFx>
        <RevealFx
          translateY="8"
          delay={0.2}
          fillWidth
          horizontal="center"
          paddingBottom="32"
        >
          <Text
            wrap="balance"
            onBackground="neutral-weak"
            variant="heading-default-xl"
          >
            I build AI-powered web applications — from training computer vision
            models to deploying them as APIs and wrapping them in full-stack
            systems.
          </Text>
        </RevealFx>
        <RevealFx
          paddingTop="12"
          delay={0.4}
          horizontal="center"
          paddingLeft="12"
        >
          <Row gap="12" wrap>
            <Button
              id="projects"
              data-border="rounded"
              href="/work"
              variant="primary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                View Projects
              </Row>
            </Button>
            <Button
              id="github"
              data-border="rounded"
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
              title="Training code · inference APIs · frontend"
            >
              <Row gap="8" vertical="center" paddingRight="4">
                <Icon name="github" onBackground="neutral-strong" />
                GitHub (Code & Experiments)
              </Row>
            </Button>
            <Button
              id="resume"
              data-border="rounded"
              target="_blank"
              rel="noopener noreferrer"
              href="/resume.pdf"
              variant="primary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                Download Resume
              </Row>
            </Button>
          </Row>
        </RevealFx>
        <RevealFx
          paddingTop="16"
          delay={0.5}
          horizontal="center"
          paddingLeft="12"
        >
          <Row gap="24" wrap horizontal="center" marginTop="24">
            <Row title="PyTorch">
              <Icon name="pytorch" onBackground="neutral-weak" size="l" />
            </Row>
            <Row title="Computer Vision">
              <Icon name="eye" onBackground="neutral-weak" size="l" />
            </Row>
            <Row title="Flask">
              <Icon name="flask" onBackground="neutral-weak" size="l" />
            </Row>
            <Row title="React">
              <Icon name="react" onBackground="neutral-weak" size="l" />
            </Row>
            <Row title="Node.js">
              <Icon name="node" onBackground="neutral-weak" size="l" />
            </Row>
            <Row title="Vercel">
              <Icon name="vercel" onBackground="neutral-weak" size="l" />
            </Row>
          </Row>
        </RevealFx>
      </Column>
    </Column>
  );
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Hero />
      <Column fillWidth gap="16" paddingX="l">
        <Row fillWidth vertical="center" gap="12">
          <Heading
            as="h2"
            variant="heading-strong-l"
            wrap="nowrap"
            style={{ whiteSpace: "nowrap" }}
          >
            Selected Projects
          </Heading>
          <Line />
        </Row>
        <Text variant="body-default-s" onBackground="neutral-weak">
          A few end-to-end builds where I trained models, shipped APIs, and
          delivered product UX.
        </Text>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      <Projects range={[2]} />
      <Mailchimp />
    </Column>
  );
}
