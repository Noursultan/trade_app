const FormatNumbers = (tick: any) => {
    if (tick >= 1000000000) {
        return `$${(tick / 1000000000).toFixed(1)}B`; 
      } else if (tick >= 1000000) {
        return `$${(tick / 1000000).toFixed(1)}M`;
      } else if (tick >= 1000) {
        return `$${(tick / 1000).toFixed(1)}K`; 
      }
      return tick;
}

export default FormatNumbers
