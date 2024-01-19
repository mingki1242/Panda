package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWritingEntity is a Querydsl query type for WritingEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWritingEntity extends EntityPathBase<WritingEntity> {

    private static final long serialVersionUID = -785599719L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWritingEntity writingEntity = new QWritingEntity("writingEntity");

    public final StringPath category = createString("category");

    public final StringPath content = createString("content");

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final StringPath detail_category = createString("detail_category");

    public final NumberPath<Integer> favorite_count = createNumber("favorite_count", Integer.class);

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final DatePath<java.time.LocalDate> regit_date = createDate("regit_date", java.time.LocalDate.class);

    public final QUserEntity userEntity;

    public final NumberPath<Integer> wid = createNumber("wid", Integer.class);

    public final StringPath writing_name = createString("writing_name");

    public final ArrayPath<byte[], Byte> writing_photo = createArray("writing_photo", byte[].class);

    public QWritingEntity(String variable) {
        this(WritingEntity.class, forVariable(variable), INITS);
    }

    public QWritingEntity(Path<? extends WritingEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWritingEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWritingEntity(PathMetadata metadata, PathInits inits) {
        this(WritingEntity.class, metadata, inits);
    }

    public QWritingEntity(Class<? extends WritingEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
    }

}

