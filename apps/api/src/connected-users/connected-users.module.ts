import { Module } from '@nestjs/common';
import { ConnectedUsersService } from './connected-users.service';
import { ConnectedUsersGateway } from './connected-users.gateway';

@Module({
  providers: [ConnectedUsersGateway, ConnectedUsersService],
  exports : [ConnectedUsersGateway]
})
export class ConnectedUsersModule {}
