const supabase = require('../../src/libs/supabase');
const Roomkeys = require('../../src/models/Room_keys');

describe('Roomkeys', () => {
    const roomId = 11;
    const userId = 11;
  
    describe("Room_keys#create", () => {
      // 正常系
      it("ルームidとユーザーidが渡された場合、問題なく登録できる", async () => {
  
        // delete before
      await supabase.from('room_keys').delete().match({ user_id: userId });

        // act
        const room_keys = await Roomkeys.create(roomId, userId);
  
        // assert
        expect(room_keys.room_id).toBe(roomId);
        expect(room_keys.user_id).toBe(userId);
  
        // delete after
        await supabase.from('room_keys').delete().match({ user_id: userId });
      })
    })
  });
  