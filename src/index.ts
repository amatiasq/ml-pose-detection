import { context, fillPage, getSize, renderText } from './canvas';
import { captureVideo } from './util/captureVideo';
import { scaleAndCenter } from './util/scaleAndCenter';

declare global {
  const ml5: any;
}

(async () => {
  fillPage();
  printLoading();

  const video = await captureVideo({
    facingMode: 'user',
    width: { exact: 1280 },
    height: { exact: 720 },
  });

  const poseNet = ml5.poseNet(video);

  let poses: any[] = [];

  detect();
  frame();

  function frame() {
    const screen = getSize();
    const rect = scaleAndCenter(
      {
        width: video.videoWidth,
        height: video.videoHeight,
      },
      screen,
    );

    video.width = rect.width;
    video.height = rect.height;

    context.clearRect(0, 0, screen.width, screen.height);
    context.drawImage(video, rect.x, rect.y, rect.width, rect.height);

    poses.forEach(({ pose }) => {
      console.log(pose);
    });

    // renderText(
    //   'Hello world',
    //   screen.width / 2,
    //   screen.height / 2,
    //   '40px arial',
    //   'white',
    //   'black',
    // );

    requestAnimationFrame(frame);
  }

  async function detect() {
    // poses = await poseNet.multiPose();
    // detect();
  }
})();

function printLoading() {
  const screen = getSize();
  context.textAlign = 'center';
  renderText('Loading...', screen.width / 2, screen.height / 2, '24px Arial');
}
