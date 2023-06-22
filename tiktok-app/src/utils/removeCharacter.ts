const removeCharacter = (chain: string) => {
  const number = '0123456789';
  const final: any = [];
  chain.split('').forEach((item: string) => {
    if (number.includes(item)) {
      final.push(item);
    }
  });

  return parseInt(final.join(''));
};

export default removeCharacter;
