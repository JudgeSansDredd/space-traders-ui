import { AgentType } from '../api/agent/types';

interface PropType {
  agent: AgentType;
}

export default function Agent({ agent }: PropType) {
  return (
    <div className="flex justify-center mt-8">
      <div className="grid grid-cols-2 gap-2 w-max">
        <div>Symbol</div>
        <div>{agent.symbol}</div>
        <div>Faction</div>
        <div>{agent.startingFaction}</div>
        <div>Credits</div>
        <div>{agent.credits.toLocaleString()}</div>
      </div>
    </div>
  );
}
