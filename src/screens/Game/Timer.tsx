import React, {useEffect, useRef, useState} from 'react';
import CustomText from '@/components/ui/Text';

import ClockIcon from '@/assets/icons/clock.svg';
import Row from '@/components/layout/Row';

interface Props {
  onTimeOut: () => void;
  trigger: number;
}

export default function Timer({onTimeOut, trigger}: Props) {
  const [timer, setTimer] = useState(60);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setTimer(60);
  }, [trigger]);

  const handleTimeOut = () => {
    console.log('Timeout');
    onTimeOut();
    clearInterval(timeoutRef.current);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setTimer(timer => {
        if (timer <= 0) {
          handleTimeOut();
        }

        return timer > 0 ? timer - 1 : 0;
      });
    }, 1000);
    timeoutRef.current = t;
    return () => clearInterval(t);
  }, []);

  return (
    <Row gap={5}>
      <ClockIcon width={18} height={18} />
      <CustomText fw="bold" fs={18} style={{minWidth: 25}}>
        {timer}
      </CustomText>
    </Row>
  );
}
