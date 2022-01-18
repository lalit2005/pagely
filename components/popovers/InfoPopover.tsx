import * as Popover from '@radix-ui/react-popover';
import { HiOutlineInformationCircle } from 'react-icons/hi';

const InfoPopover: React.FC<{ content: string }> = ({ content, ...props }) => {
  return (
    <span className='relative mx-2 transition-all top-1'>
      <Popover.Root>
        <span>
          <Popover.Trigger asChild>
            <HiOutlineInformationCircle className='w-5 h-5 p-px rounded cursor-pointer hover:bg-gray-100' />
          </Popover.Trigger>
          <Popover.Content sideOffset={10} side='top'>
            <div className='w-64 px-2 py-1 text-sm bg-black rounded-md shadow-lg text-gray-50'>
              {content}
              <div className='mt-3'>{props.children}</div>
            </div>
          </Popover.Content>
        </span>
      </Popover.Root>
    </span>
  );
};

export default InfoPopover;
