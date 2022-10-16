import { styled } from '@stitches/react';

export default function Button({ }) {
  const Button = styled('button', {
    backgroundColor: 'gainsboro',
    borderRadius: '9999px',
    fontSize: '13px',
    padding: '10px 15px',
    '&:hover': {
      backgroundColor: 'lightgray',
    },
  });

  return (
    <Button>Button</Button>
  )
}