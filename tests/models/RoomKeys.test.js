const supabase = require('../../src/libs/supabase');
const RoomKeysModel = require('../../src/models/RoomKeys');

describe('RoomKeys', () => {
    const roomId = 1;
    const userId = 1;
  
    describe("RoomKeys#create", () => {
      // 正常系
      it("ルームidとユーザーidが渡された場合、問題なく登録できる", async () => {
  
        // delete before
      await supabase.from('room_keys').delete().match({ user_id: userId });

        // act
        const room_key = await RoomKeysModel.create(roomId, userId);
  
        // assert
        expect(room_key.room_id).toBe(roomId);
        expect(room_key.user_id).toBe(userId);
  
        // delete after
        await supabase.from('room_keys').delete().match({ user_id: userId });
      })
    })

    describe('Room#update', () => {
      // 正常系
      it('正常な更新情報が与えられた場合、問題なく更新できるか', async () => {
        const { data: room_key } = await supabase
          .from('room_keys')
          .insert({ room_id: roomId, user_id: userId })
          .select()
          .single();
  
        const updateData = {room_id:4 ,user_id:4};
  
        const updatedRoom = await RoomKeysModel.update(room_key.id, updateData);
        expect(updatedRoom).not.toBeNull();
        expect(updatedRoom.room_id).toBe(updateData.room_id);
        expect(updatedRoom.user_id).toBe(updateData.user_id);
      })
  
      // TODO: 異常系
    })
  });
  
