import { useState } from 'react';
import {FcCheckmark, FcCancel} from 'react-icons/fc'
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string}) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <FcCheckmark/> :<FcCancel/>} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export function PasswordStrength({value, setValue, formData, cb, timeoutId, setTimeoutId, error, invalid}) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const passwordOnChangeHandler = (e) => {
    setValue({...formData, password: e.currentTarget.value})
    let passwordTimeOutId;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const password = e.currentTarget.value;
      passwordTimeOutId = setTimeout(() => {
        cb(password);
      }, 1000);
      setTimeoutId(passwordTimeOutId);
    };  
    
  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      placement="end"
      withArrow
      styles={{ popover: { width: '100%' } }}
      noFocusTrap
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => setPopoverOpened(false)}
      target={
        <PasswordInput
          formNoValidate
          required
          label="Your password"
          placeholder="Your password"
          description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
          value={value}
          onChange={passwordOnChangeHandler}
          error={error}
          invalid={invalid}
        />
      }
    >
      <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
      <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
      {checks}
    </Popover>
  );
}