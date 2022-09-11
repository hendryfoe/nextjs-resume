export function randomValue(value: string) {
  let result = value.split('');

  for (let i = 0; i < value.length; i++) {
    if (/[a-zA-Z]/gi.test(result[i])) {
      result[i] = randomChar();
    }

    if (/\d/.test(result[i])) {
      result[i] = randomNumber();
    }
  }

  return result.join('');
}

export function randomNumber() {
  const possibleNumbers = '0123456789';

  const randomIndex = Math.floor(Math.random() * possibleNumbers.length);

  return possibleNumbers[randomIndex];
}

export function randomChar() {
  let possibleChars = 'abcdefghijklmnopqrstuvwxyz';
  possibleChars += possibleChars.toUpperCase();

  const randomIndex = Math.floor(Math.random() * possibleChars.length);

  return possibleChars[randomIndex];
}

export function obscureData(payload: Record<string, any>, obscureKeys: string | string[]) {
  if (payload == null) {
    return payload;
  }

  if (obscureKeys == null || obscureKeys === '' || obscureKeys.length === 0) {
    return payload;
  }

  if (typeof payload === 'object' && Object.keys(payload).length === 0) {
    return payload;
  }

  function transformObscureKeys(value: string[] | string) {
    return ([] as string[]).concat(value).map((obscureKey) => {
      obscureKey = obscureKey.replace(/\.?\[/, '.');
      obscureKey = obscureKey.replace(']', '');

      return obscureKey;
    });
  }

  function iterate(data: Record<string, any> | any[], parentKey: string | null = null) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        iterate(data[i], `${parentKey}.${i}`);
      }
    } else if (typeof data === 'object') {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const pKey = parentKey ? parentKey + '.' : '';
          iterate(data[key], `${pKey}${key}`);
        }
      }
    } else {
      if (parentKey) {
        const transformedObscureKeys = transformObscureKeys(obscureKeys);

        if (transformedObscureKeys.find((k) => parentKey.indexOf(k) >= 0)) {
          const pKeys = parentKey.split('.');
          let temp = payload;

          for (let i = 0; i < pKeys.length; i++) {
            if (i !== pKeys.length - 1) {
              // nested
              temp = temp[pKeys[i]];
            } else {
              // last element
              temp[pKeys[i]] = randomValue(temp[pKeys[i]]);
            }
          }
        }
      }
    }
  }

  iterate(payload);

  return payload;
}

export function deepCopy(value: any) {
  return JSON.parse(JSON.stringify(value));
}
