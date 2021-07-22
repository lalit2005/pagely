import { HexColorPicker, HexColorInput } from 'react-colorful';
import { HiOutlineClipboard } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

const Utility = () => {
  const [color, setColor] = useState('#aabbcc');
  const [xOffset, setXOffset] = useState(10);
  const [yOffset, setYOffset] = useState(10);
  const [blur, setBlur] = useState(10);
  const [spread, setSpread] = useState(10);
  return (
    <div>
      <div>
        <h3 className='mb-3 text-xl font-bold'>Color Picker</h3>
        <div>
          <div>
            <HexColorInput
              color={color}
              onChange={setColor}
              className='px-1 py-px my-2 border border-gray-500 rounded-full focus:outline-none'
            />
            <HexColorPicker color={color} onChange={setColor} />
          </div>
          <div
            className='inline-flex px-2 py-px my-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100'
            onClick={() => {
              window.navigator.clipboard.writeText(color);
              toast.success(
                `Color - ${color.substr(1).toUpperCase()} copied to clipboard!`
              );
            }}>
            <span
              className='relative w-6 h-6 mr-2 rounded top-2'
              style={{ backgroundColor: color }}
            />
            <p className='my-2 mr-2 text-lg uppercase'>{color}</p>
            <HiOutlineClipboard className='relative w-8 h-8 top-1' />
            <Toaster />
          </div>
        </div>
        <hr className='w-full mx-auto my-5 text-gray-200' />
        <div>
          <h3 className='mb-3 text-xl font-bold'>Shadow generator</h3>
          <div className='flex items-center max-w-xl justify-evenly'>
            <div>
              <div className='mt-4'>
                <p className='mb-1 text-sm text-gray-600'>
                  X Offset: {xOffset}px
                </p>
                <Slider.Root
                  defaultValue={[xOffset]}
                  onValueChange={(value) => setXOffset(value[0])}
                  orientation='horizontal'
                  className='relative flex items-center w-52'>
                  <Slider.Track className='relative flex-grow h-3 bg-blue-100 rounded-full'>
                    <Slider.Range className='absolute h-full bg-gray-700 rounded-full' />
                  </Slider.Track>
                  <Slider.Thumb className='block w-6 h-6 bg-blue-300 rounded-full shadow-sm hover:bg-blue-500' />
                </Slider.Root>
              </div>
              <div className='mt-4'>
                <p className='mb-1 text-sm text-gray-600'>
                  Y Offset: {yOffset}px
                </p>
                <Slider.Root
                  defaultValue={[yOffset]}
                  onValueChange={(value) => setYOffset(value[0])}
                  orientation='horizontal'
                  className='relative flex items-center w-52'>
                  <Slider.Track className='relative flex-grow h-3 bg-blue-100 rounded-full'>
                    <Slider.Range className='absolute h-full bg-gray-700 rounded-full' />
                  </Slider.Track>
                  <Slider.Thumb className='block w-6 h-6 bg-blue-300 rounded-full shadow-sm hover:bg-blue-500' />
                </Slider.Root>
              </div>
              <div className='mt-4'>
                <p className='mb-1 text-sm text-gray-600'>Blur: {blur}px</p>
                <Slider.Root
                  defaultValue={[blur]}
                  onValueChange={(value) => setBlur(value[0])}
                  orientation='horizontal'
                  className='relative flex items-center w-52'>
                  <Slider.Track className='relative flex-grow h-3 bg-blue-100 rounded-full'>
                    <Slider.Range className='absolute h-full bg-gray-700 rounded-full' />
                  </Slider.Track>
                  <Slider.Thumb className='block w-6 h-6 bg-blue-300 rounded-full shadow-sm hover:bg-blue-500' />
                </Slider.Root>
              </div>
              <div className='mt-4'>
                <p className='mb-1 text-sm text-gray-600'>Spread: {spread}px</p>
                <Slider.Root
                  defaultValue={[spread]}
                  onValueChange={(value) => setSpread(value[0])}
                  orientation='horizontal'
                  className='relative flex items-center w-52'>
                  <Slider.Track className='relative flex-grow h-3 bg-blue-100 rounded-full'>
                    <Slider.Range className='absolute h-full bg-gray-700 rounded-full' />
                  </Slider.Track>
                  <Slider.Thumb className='block w-6 h-6 bg-blue-300 rounded-full shadow-sm hover:bg-blue-500' />
                </Slider.Root>
              </div>
              <p className='my-2 text-sm text-gray-600'>
                To change the color of the shadow, change the color in the color
                picker above.
              </p>
              <button
                className='px-2 py-px mt-2 border rounded cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  toast.success(`Shadow's code copied to clipboard!`, {
                    position: 'bottom-center',
                  });
                  window.navigator.clipboard.writeText(
                    `box-shadow: ${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color}px;`
                  );
                }}>
                Copy code
              </button>
            </div>
            <div className='inline-block'>
              <div
                className='w-24 h-24 max-w-md mx-auto mr-5 border border-gray-400 rounded'
                style={{
                  boxShadow: `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color}`,
                }}
              />
            </div>
          </div>
        </div>
        <hr className='w-full mx-auto my-5 text-gray-200' />
        <div>
          <h3 className='mb-3 text-xl font-bold'>Some resources...</h3>
          <ul>
            {resources.map((resource) => {
              return (
                <li key={resource.title} className='mt-1'>
                  <span className='text-gray-300 pointer-events-none select-none'>
                    {'-> '}
                  </span>
                  <a
                    href={resource.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-base text-blue-600 hover:text-blue-700 hover:underline'>
                    {resource.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Utility;

const resources = [
  {
    title: 'Neumorphism shadow generator',
    link: 'https://neumorphism.io/',
  },
  {
    title: 'Gradients',
    link: 'https://gradient-king.vercel.app/',
  },
  {
    title: 'Coolors gradient maker',
    link: 'https://coolors.co/gradient-maker/1f140d-9b8074',
  },
  {
    title: 'Google fonts',
    link: 'https://fonts.google.com',
  },
  {
    title: 'Fonts in the wild',
    link: 'https://www.fontsinthewild.com/',
  },
];
