import { Button } from "$/_ui/atoms/button";
import { Container } from "$/_ui/atoms/container";

export const Fixture = {
  basic: () => <Container.Basic>Container.Basic</Container.Basic>,
  floatingBottom: (
    <Container.Floating className="w-screen px-6 py-5" position="bottom">
      <Button.Basic>Container.Floating</Button.Basic>
    </Container.Floating>
  ),
  floatingTop: (
    <Container.Floating className="w-screen px-6 py-5" position="top">
      <Button.Basic>Container.Floating</Button.Basic>
    </Container.Floating>
  ),
};

export default Fixture;
