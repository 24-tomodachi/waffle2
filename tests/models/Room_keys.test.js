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
        const room_keys = await RoomKeysModel.create(roomId, userId);
  
        // assert
        expect(room_keys.room_id).toBe(roomId);
        expect(room_keys.user_id).toBe(userId);
  
        // delete after
        await supabase.from('room_keys').delete().match({ user_id: userId });
      })
    })
  });
  